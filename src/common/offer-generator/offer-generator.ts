import dayjs from 'dayjs';
import {v4 as uuidv4} from 'uuid';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 3000;

const FIRST_MONTH_DAY = 1;
const LAST_MONTH_DAY = 31;

const FALSE = 0;
const TRUE  = 1;

const MIN_RATE = 1;
const MAX_RATE = 5;

const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 9;

const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 50;

const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 500;

const MIN_GEOGRAPHICAL_DEGREES = 0;
const MAX_GEOGRAPHICAL_DEGREES = 180;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_MONTH_DAY, LAST_MONTH_DAY), 'day').toISOString();;
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const detailImage = getRandomItems<string>(this.mockData.detailImages).join(';');
    const isPremium = Boolean(generateRandomValue(FALSE, TRUE)).toString();
    const rating = generateRandomValue(MIN_RATE, MAX_RATE).toString();
    const offerType = Object.keys(OfferType)[generateRandomValue(0, Object.keys(OfferType).length - 1)];
    const roomsNumber = generateRandomValue(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER).toString();
    const guestsNumber = generateRandomValue(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const userId = uuidv4().toSting();
    const commentsNumber = generateRandomValue(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER).toString();
    const locationLatitude = generateRandomValue(MIN_GEOGRAPHICAL_DEGREES, MAX_GEOGRAPHICAL_DEGREES).toString();
    const locationLongitude = generateRandomValue(MIN_GEOGRAPHICAL_DEGREES, MAX_GEOGRAPHICAL_DEGREES).toString();
    return [
      title, description, postDate,
      city, previewImage, detailImage, isPremium,
      rating, offerType, roomsNumber, guestsNumber,
      price, features, userId, commentsNumber,
      locationLatitude, locationLongitude
    ].join('\t');
  }
}
