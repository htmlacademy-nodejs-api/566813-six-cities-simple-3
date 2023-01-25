import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { FeaturesType } from '../../types/features-type.enum.js';
import { LocationType } from '../../types/location-type.type.js';
import { City } from '../../types/city-type.type.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    type: () => String,
    required: true
  })
  public city!: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true})
  public dateilImage!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public offerType!: OfferType;

  @prop({required: true})
  public roomsNumber!: number;

  @prop({required: true})
  public guestsNumber!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    default: [],
    required: true
  })
  public features!: FeaturesType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsNumber?: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public location!: LocationType;
}

export const OfferModel = getModelForClass(OfferEntity);
