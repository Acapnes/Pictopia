import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}
