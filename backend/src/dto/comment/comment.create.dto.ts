import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;
}
