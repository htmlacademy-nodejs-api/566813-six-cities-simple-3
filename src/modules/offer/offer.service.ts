import {inject, injectable} from 'inversify';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DEFAULT_OFFER_COUNT} from './offer.constant.js';
import { Types } from 'mongoose';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly OfferModel: ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.OfferModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.OfferModel
      .aggregate([
       {
        $match: { _id: new Types.ObjectId(offerId) }
      },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            pipeline: [
              { $project: { 'rating': 1}}
            ],
            as: 'comments'
          },
        },
        { $set:
            { id: { $toString: '$_id'},
            rating: {$round: [{ $avg: '$comments.rating'}, 1]},
            commentsNumber: { $size: '$comments'}
          },
        },
        {
          $unset: 'comments'
        }
      ]);

      await this.OfferModel.populate(offer, {path: 'userId'});

      return offer[0];

  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    const offers = await this.OfferModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            pipeline: [
              { $project: { 'rating': 1}}
            ],
            as: 'comments'
          },
        },
        { $set:
            { id: { $toString: '$_id'},
            rating: {$round: [{ $avg: '$comments.rating'}, 1]},
            commentsNumber: { $size: '$comments'}
          },
        },
        {
          $unset: 'comments'
        },
        {
          $sort: { postDate: SortType.Down}
        },
        {
          $limit: limit
        }
      ]);

      await this.OfferModel.populate(offers, {path: 'userId'});

      return offers;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.OfferModel
      .exists({_id: documentId})) !== null;
  }
}
