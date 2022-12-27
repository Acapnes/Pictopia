import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { Pic } from 'src/schemas/pic.schema';
import { User } from 'src/schemas/user.schema';

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
  @Type(() => Date)
  @IsDate()
  creationDate: Date;

  @IsNotEmpty()
  @IsObject()
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @IsBoolean()
  @IsNotEmpty()
  confrimed: boolean;

  @IsString()
  bio: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsObject()
  settings: {
    privateAccount: boolean;
  };

  @IsArray()
  favCategories: Category[];

  @IsArray()
  savedPictures: Pic[];

  @IsArray()
  blockedUsers: User[];

  @IsObject()
  deepLearning: {
    searched: string[];
  };
}
