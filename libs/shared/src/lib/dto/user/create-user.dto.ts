import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class LoginUserDto {
  @IsEmail({}, { message: 'Email is invalid!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email is invalid!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  @IsNotEmpty({ message: 'Username is required!' })
  username: string;
}

export class CreateUserDto extends PartialType(RegisterUserDto) {
  @IsString({ message: 'Gender is string!' })
  gender: string;

  @IsString({message: 'Role is string!'})
  role: string;

  @IsString({message: 'Office code is string!'})
  office_code: string;

  @IsString({message: 'Country code is string!'})
  country_code: string;
}