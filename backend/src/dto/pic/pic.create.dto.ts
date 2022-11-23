import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';

export class PicCreateDto {
  @IsNotEmpty()
  @IsMongoId()
  authorPic: User;

  @IsNotEmpty()
  @IsArray()
  categories: Category[];

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  hashTags: string[];

  @IsNotEmpty()
  @IsObject()
  picture_file: {
    data: Buffer;
    contentType: string;
  };
}
