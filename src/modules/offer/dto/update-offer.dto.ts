import { City } from "../../../types/city-type.enum";
import { FeaturesType } from "../../../types/features-type.enum";
import { OfferType } from "../../../types/offer-type.enum";
import { LocationType } from "../../../types/location-type.type";

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;
  public previewImage?: string;
  public detailImage?: string;
  public isPremium?: boolean;
  public offerType?: OfferType;
  public roomsNumber?: number;
  public guestsNumber?: number;
  public price?: number;
  public features?: FeaturesType[];
  public location?: LocationType
}
