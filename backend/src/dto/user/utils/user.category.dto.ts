import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UserCategoryDto {
  @IsNotEmpty()
  category_id: mongoose.Types.ObjectId | any;
}
