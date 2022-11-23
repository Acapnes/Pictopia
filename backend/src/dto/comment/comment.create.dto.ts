import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { PicCreateDto } from '../pic/pic.create.dto';

export class CommentCreateDto {
  @IsNotEmpty()
  destPicture: PicCreateDto;

  @IsOptional()
  parentId?: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
