import { City } from '../../../types/city-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum';
import { LocationType } from '../../../types/location-type.type.js';
import { FeaturesType } from '../../../types/features-type.enum.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: City;
  public previewImage!: string;
  public detailImage!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public offerType!: OfferType;
  public roomsNumber!: number;
  public guestsNumber!: number;
  public price!: number;
  public features!: FeaturesType[];
  public userId!: string;
  public commentsNumber?: number;
  public location!: LocationType;
}
