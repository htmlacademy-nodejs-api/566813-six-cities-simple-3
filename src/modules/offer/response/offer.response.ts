import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import { LocationType } from '../../../types/location-type.type.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public detailImage!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: boolean;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public guestsNumber!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: string[];

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public commentsNumber!: number;

  @Expose()
  public location!: LocationType;
}
