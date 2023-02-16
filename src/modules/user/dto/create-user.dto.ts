import {IsEmail, IsString, IsEnum, Length} from 'class-validator';
import { UserType } from '../../../types/user-types.type.js';
import { UserConstraints } from '../../../utils/constraints.js';

export default class CreateUserDto {
  @Length(UserConstraints.NameMinLength, UserConstraints.NameMaxLength, {message: 'Min name length is 1, max is 15'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(UserConstraints.PasswordMinLength, UserConstraints.PasswordMaxLength, {message: 'Min length for password is 6, max is 12'})
  public password!: string;

  @IsEnum(UserType, {message: 'userType must be a value from UserType list'})
  public userType!: UserType;
}
