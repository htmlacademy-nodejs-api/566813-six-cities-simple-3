import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserType } from '../../types/user-types.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const enum GenerateOptions {
  DetailImagesNumber = 6,
  MinPrice = 100,
  MaxPrice = 100000,
  FirstMonthDay = 1,
  LastMonthDay = 31,
  False = 0,
  True = 1,
  MinRate = 1,
  MaxRate = 5,
  MinRoomsNumber = 1,
  MaxRoomsNumber = 8,
  MinGuestsNumber = 1,
  MaxGuestsnumber = 10,
  MinCommentsNumber = 0,
  MaxCommentsNumber = 500,
  MinGeographicalDegrees = 0,
  MaxGeographicalDegrees = 90,
  PasswordSample = 'testpassword'
}


export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(GenerateOptions.FirstMonthDay, GenerateOptions.LastMonthDay), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const detailImages = this.mockData.detailImages.slice(0, GenerateOptions.DetailImagesNumber).join(';');
    const isPremium = Boolean(generateRandomValue(GenerateOptions.False, GenerateOptions.True)).toString();
    const rating = generateRandomValue(GenerateOptions.MinRate, GenerateOptions.MaxRate).toString();
    const offerType = Object.keys(OfferType)[generateRandomValue(0, Object.keys(OfferType).length - 1)];
    const roomsNumber = generateRandomValue(GenerateOptions.MinRoomsNumber, GenerateOptions.MaxRoomsNumber).toString();
    const guestsNumber = generateRandomValue(GenerateOptions.MinGuestsNumber, GenerateOptions.MaxGuestsnumber).toString();
    const price = generateRandomValue(GenerateOptions.MinPrice, GenerateOptions.MaxPrice).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatarPaths);
    const password = GenerateOptions.PasswordSample;
    const userType = Object.keys(UserType)[generateRandomValue(0, Object.keys(UserType).length - 1)];
    const commentsNumber = generateRandomValue(GenerateOptions.MinCommentsNumber, GenerateOptions.MaxCommentsNumber).toString();
    const commentText = getRandomItem<string>(this.mockData.commentsText);
    const locationLatitude = generateRandomValue(GenerateOptions.MinGeographicalDegrees, GenerateOptions.MaxGeographicalDegrees, 6).toString();
    const locationLongitude = generateRandomValue(GenerateOptions.MinGeographicalDegrees, GenerateOptions.MaxGeographicalDegrees, 6).toString();
    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      detailImages,
      isPremium,
      rating,
      offerType,
      roomsNumber,
      guestsNumber,
      price,
      features,
      name,
      email,
      avatarPath,
      password,
      userType,
      commentsNumber,
      commentText,
      locationLatitude,
      locationLongitude
    ].join('\t');
  }
}
