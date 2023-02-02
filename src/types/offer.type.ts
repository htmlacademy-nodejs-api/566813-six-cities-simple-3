import { City } from './city-type.enum.js';
import { OfferType } from './offer-type.enum.js';
import { LocationType } from './location-type.type.js';
import { FeaturesType } from './features-type.enum.js';
import { User } from './user.type.js';

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
    user: User;
    commentsNumber?: number;
    location: LocationType
  }
