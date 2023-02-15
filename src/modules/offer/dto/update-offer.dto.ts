import { City } from '../../../types/city-type.enum.js';
import { FeaturesType } from '../../../types/features-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { LocationType } from '../../../types/location-type.type.js';
import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsInt,
  Length,
  Max,
  MaxLength,
  Min,
  IsNotEmptyObject
} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @Length(1, 100, {message: 'Min title length is 10, max is 100'})
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {message: 'Min description length is 20, max is 1024'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, {message: 'City must be "Paris", "Cologne", "Brussels ", "Amsterdam ", "Hamburg", "Dusseldorf"'})
  public city?: City;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field "previewImage"'})
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: 'Field "detailImages" must be an array' })
  @ArrayMinSize(6, { message: 'previewImage should only contain 6 values' })
  @ArrayMaxSize(6, { message: 'previewImage should only contain 6 values' })
  @MaxLength(256, {each: true, message: 'Too short for field "previewImage"'})
  public detailImages?: string[];

  @IsOptional()
  @IsBoolean({message: 'isPremium must be "true" or "false"'})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, {each: true, message: 'offerType must be a value from offerType list'})
  public offerType?: OfferType;

  @IsOptional()
  @IsInt({message: 'RoomsNumber must be an integer'})
  @Min(1, {message: 'Minimum roomsNumber is  1'})
  @Max(8, {message: 'Maximum roomsNumber is 8'})
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({message: 'GuestsNumber must be an integer'})
  @Min(1, {message: 'Minimum guestsNumber is  1'})
  @Max(10, {message: 'Maximum guestsNumber is 10'})
  public guestsNumber?: number;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100 000'})
  public price?: number;

  @IsOptional()
  @IsArray({message: 'Field "features" must be an array' })
  @IsEnum(FeaturesType, {each: true, message: 'Features must be a value from FeaturesType list'})
  public features?: FeaturesType[];

  @IsOptional()
  @IsNotEmptyObject({}, {message: '"Location" field must be an object'})
  public location?: LocationType;
}
