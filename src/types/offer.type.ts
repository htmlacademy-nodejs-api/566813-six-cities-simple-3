import { City } from './city-type.type.js';
import { OfferType } from './offer-type.type.js';
import { LocationType } from './location-type.type.js';
import { FeatureType } from './feature-type.type.js';

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: City;
    // previewImage: string;
    // detailImage: string[];
    // isPremium: boolean;
    // rating: number;
    // offerType: OfferType;
    // roomsNumber: number;
    // guestsNumber: number;
    // price: number;
    // features: FeatureType[];
    // userId: string;
    // commentsNumber?: number;
    // location: LocationType
  }
