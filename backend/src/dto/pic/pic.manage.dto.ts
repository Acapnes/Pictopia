import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';

export class PicManageDto {
  @IsNotEmpty()
  @IsMongoId()
  _id!: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsOptional()
  categories?: Category[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  hashTags?: string[];

  @IsOptional()
  @IsObject()
  picture_file?: {
    data: Buffer;
    contentType: string;
  };
  
}
