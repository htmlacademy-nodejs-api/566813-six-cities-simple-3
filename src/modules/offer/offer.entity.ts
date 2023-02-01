import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { FeaturesType } from '../../types/features-type.enum.js';
import { LocationType } from '../../types/location-type.type.js';
import { City } from '../../types/city-type.enum.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: 10,
    maxlength: 100})
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: 20,
    maxlength: 1024
  })
  public description!: string;

  @prop({
    required: true
  })
  public postDate!: Date;

  @prop({
    trim: true,
    required: true,
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({
    required: true
  })
  public previewImage!: string;

  @prop({
    required: true,
    minlength: 6,
    maxlength: 6
  })
  public detailImage!: string[];

  @prop({
    required: true
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5
  })
  public rating!: number;

  @prop({
    trim: true,
    required: true,
    type: () => String,
    enum: OfferType
  })
  public offerType!: OfferType;

  @prop({
    required: true,
    min: 1,
    max: 8})
  public roomsNumber!: number;

  @prop({
    required: true,
    min: 1,
    max: 10})
  public guestsNumber!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000})
  public price!: number;

  @prop({
    required: true,
    default: [],
    type: () => String
  })
  public features!: FeaturesType[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsNumber?: number;

  @prop({
    required: true
  })
  public location!: LocationType;
}

export const OfferModel = getModelForClass(OfferEntity);
