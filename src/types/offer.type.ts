import { City } from './city-type.type.js';
import { OfferType } from './offer-type.type.js';
import { LocationType } from './location-type.type.js';
import { FeaturesType } from './features-type.enum.js';

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: City;
    previewImage: string;
    detailImage: string[];
    isPremium: boolean;
    rating: number;
    offerType: OfferType;
    roomsNumber: number;
    guestsNumber: number;
    price: number;
    features: FeaturesType[];
    userId: string;
    commentsNumber?: number;
    location: LocationType
  }
