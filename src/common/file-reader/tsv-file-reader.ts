import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';
import { cities } from '../../types/city-type.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { FeaturesType } from '../../types/features-type.enum.js';

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
        previewImage,
        detailImage,
        isPremium,
        rating,
        offerType,
        roomsNumber,
        guestsNumber,
        price,
        features,
        userId,
        commentsNumber,
        locationLatitude,
        locationLongitude
      ]) => {

        const foundCity = cities.find((el) => (el === city));

        return {
          title,
          description,
          postDate: new Date(postDate),
          city: foundCity || 'Amsterdam',
          previewImage,
          detailImage: detailImage.split(';'),
          isPremium: Boolean(Number(isPremium)),
          rating: Number.parseInt(rating, 10),
          offerType: OfferType[offerType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
          roomsNumber: Number.parseInt(roomsNumber, 10),
          guestsNumber: Number.parseInt(guestsNumber, 10),
          price: Number.parseInt(price, 10),
          features: features.split(';').map((name) => (FeaturesType[name as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
          userId,
          commentsNumber: Number.parseInt(commentsNumber, 10),
          location: {
            latitude:  Number.parseFloat(locationLatitude),
            longitude:  Number.parseFloat(locationLongitude)
          }
        };
      });
  }
}
