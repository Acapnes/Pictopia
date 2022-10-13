import { IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class UserDto {
  @IsMongoId()
  _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsObject()
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsBoolean()
  @IsNotEmpty()
  confrimed: boolean;

  @IsString()
  bio: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
