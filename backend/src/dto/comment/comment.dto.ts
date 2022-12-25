import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { PicCreateDto } from '../pic/pic.create.dto';
import { UserDto } from '../user/user.dto';

export class CommentDto {
  @IsOptional()
  @IsMongoId()
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsOptional()
  author: UserDto;

  @IsOptional()
  parentId: CommentDto;

  @IsOptional()
  @IsNotEmpty()
  destPicture: PicCreateDto;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;
}
