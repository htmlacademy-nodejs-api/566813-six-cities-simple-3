import {IsMongoId, IsInt, IsString, Length, Min, Max} from 'class-validator';
import { CommentConstraints } from '../../../utils/constraints.js';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(CommentConstraints.TextMinLength, CommentConstraints.TextMaxLength, {message: 'Min text length is 5, text is 1024'})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(CommentConstraints.RaitingMin, {message: 'Minimum rating is 1'})
  @Max(CommentConstraints.RaitngdMax, {message: 'Maximum rating is 5'})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  public userId!: string;
}
