import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional
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
  @IsOptional()
  @IsString({ message: 'Gender is string!' })
  gender: string;

  @IsOptional()
  @IsString({ message: 'Address is string!' })
  address: string;

  @IsString({message: 'Role is string!'})
  @IsArray()
  role: string[];

  @IsOptional()
  @IsString({message: 'Office is string!'})
  office_code: string;
}