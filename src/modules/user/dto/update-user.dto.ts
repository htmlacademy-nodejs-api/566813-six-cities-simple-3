import {IsEnum, Length, MaxLength} from 'class-validator';
import { UserType } from '../../../types/user-types.type.js';
import { UserConstraints } from '../../../utils/constraints.js';

export default class UpdateUserDto {
  @MaxLength(UserConstraints.AvatarPathMaxLength, {message: 'Max avatarPath length is 256'})
  public avatarPath?: string;

  @Length(UserConstraints.NameMinLength, UserConstraints.NameMaxLength, {message: 'Min name length is 1, max is 15'})
  public name?: string;

  @IsEnum(UserType, {message: 'userType must be a value from UserType list'})
  public userType?: string;
}
