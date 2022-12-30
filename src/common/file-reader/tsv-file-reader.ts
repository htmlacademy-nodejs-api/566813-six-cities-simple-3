import { readFileSync } from 'fs';
import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';
]

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title,
        description,
        postDate,
        city,
        // previewImage,
        // detailImage,
        // isPremium,
        // rating,
        // offerType,
        // roomsNumber,
        // guestsNumber,
        // price,
        // features,
        // userId,
        // commentsNumber,
        // location
      ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: new City(city),
        // previewImage,
        // detailImage,
        // isPremium,
        // rating,
        // offerType,
        // roomsNumber,
        // guestsNumber,
        // price,
        // features,
        // userId,
        // commentsNumber,
        // location
      }));
  }
}


/*
type: OfferType[type as 'Buy' | 'Sell'],
categories: categories.split(';')
  .map((name) => ({name})),
price: Number.parseInt(price, 10),
user: {email, firstname, lastname, avatarPath},

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
    features: FeatureType[];
    userId: string;
    commentsNumber?: number;
    location: LocationType
  }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, previewImage, 
        detailImage, isPremium, rating, offerType, roomsNumber, 
        guestsNumber, price, features, commentsNumber, location]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: '234',
        previewImage: '',
        detailImage: '',
        isPremium: true,
        rating
        offerType, 
        roomsNumber, 
        guestsNumber, 
        price, 
        features, 
        commentsNumber, 
        location
      }));
*/