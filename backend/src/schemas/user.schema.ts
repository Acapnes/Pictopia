import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DeepLearning } from './altSchemas/user/user.learn.schema';
import { SecuritySettings } from './altSchemas/user/user.security.schema';
import { Category } from './category.schema';
import { Pic } from './pic.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: false, default: '' })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  creationDate: Date;

  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  profile_background: {
    data: Buffer;
    contentType: string;
  };

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Pic',
    required: false,
    default: [],
  })
  savedPictures: Pic[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: false,
    default: [],
  })
  favCategories: Category[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false,
    default: [],
  })
  blockedUsers: User[];

  @Prop({ type: Object, required: false, default: new DeepLearning() })
  deepLearning: DeepLearning;

  @Prop({ type: [], required: false, default: [] })
  userSocials: [
    {
      index: number;
      platform: string;
      url: string;
    }
  ];

  @Prop({ type: Object, required: false, default: new SecuritySettings() })
  settings: SecuritySettings;

  @Prop({ required: false, default: false })
  confrimed: boolean;

  @Prop({ required: false, default: '' })
  bio: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
