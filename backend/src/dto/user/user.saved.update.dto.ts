import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UserSavedPictureDto {
  @IsNotEmpty()
  picture_id: mongoose.Types.ObjectId | any;
}
