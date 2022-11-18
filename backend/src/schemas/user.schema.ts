import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserSocials } from './altSchemas/user.socials.schema';
import { Category } from './category.schema';
import { Pic } from './pic.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Pic', required: false })
  savedPictures: Pic[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Category', required: false })
  favCategories: Category[];
  
  @Prop({ type: Object, required: false })
  userSocials: UserSocials;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: false })
  confrimed: boolean;

  @Prop({ required: false })
  bio: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
