import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsMongoId()
  destPicture: mongoose.Types.ObjectId;

  @IsOptional()
  parentId?: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
