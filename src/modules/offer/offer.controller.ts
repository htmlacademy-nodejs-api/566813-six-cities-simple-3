import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import HttpError from '../../common/errors/http-error.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {fillDTO} from '../../utils/common.js';
import OfferResponse from './response/offer.response.js';
import {RouteParams, RouteFieldNames} from './offer.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import UploadPreviewImageResponse from './response/upload-preview-image.response.js';
import UploaddetailImagesResponse from './response/upload-detail-image.response.js';

type ParamsGetOffer = {
  offerId: string;
  files: string;
}


@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware(RouteParams.OfferId),
        new DocumentExistsMiddleware(this.offerService, 'Offer', RouteParams.OfferId)
      ]
    });
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(RouteParams.OfferId),
        new DocumentExistsMiddleware(this.offerService, 'Offer', RouteParams.OfferId)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(RouteParams.OfferId),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', RouteParams.OfferId)
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware(RouteParams.OfferId),
        new DocumentExistsMiddleware(this.offerService, 'Offer', RouteParams.OfferId)
      ]
    });
    this.addRoute({
      path: '/:offerId/image/preview',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(RouteParams.OfferId),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), RouteFieldNames.PreviewImage)
      ]
    });
    this.addRoute({
      path: '/:offerId/image/detail',
      method: HttpMethod.Post,
      handler: this.uploadDetailImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(RouteParams.OfferId),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), RouteFieldNames.DetailImages)
      ]
    });
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const {body, user} = req;
    const result = await this.offerService.create({...body, userId: user.id});
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferResponse, updatedOffer));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async uploadPreviewImage(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {offerId} = req.params;
    const updateDto = { previewImage: req.params.files };

    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadPreviewImageResponse, {...updateDto}));
  }

  public async uploadDetailImages(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const { offerId } = req.params;
    const updateDto = { detailImages: req.params.files.trimEnd().split(' ') };

    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploaddetailImagesResponse, { ...updateDto }));
  }
}
