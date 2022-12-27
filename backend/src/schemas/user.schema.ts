import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PictureFile } from './altSchemas/utils/picture.file.schema';
import { DeepLearning } from './altSchemas/user/user.learn.schema';
import { SecuritySettings } from './altSchemas/user/user.security.schema';
import { UserSocials } from './altSchemas/user/user.socials.schema';
import { Category } from './category.schema';
import { Pic } from './pic.schema';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field({ nullable: true })
  @Prop({ required: false, default: '' })
  name: string;

  @Field({ nullable: false })
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: false })
  @Prop({ required: true, unique: true })
  username: string;

  @Field({ nullable: false })
  @Prop({ required: true })
  creationDate: Date;

  @Field(() => PictureFile, {
    nullable: false,
    defaultValue: { data: null, contentType: null },
  })
  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @Field(() => PictureFile, {
    nullable: false,
    defaultValue: { data: null, contentType: null },
  })
  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  profile_background: {
    data: Buffer;
    contentType: string;
  };

  @Field(() => [Pic], { nullable: false })
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

  @Field(() => [User], { nullable: false })
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false,
    default: [],
  })
  blockedUsers: User[];

  @Field(() => DeepLearning, { nullable: true })
  @Prop({ type: Object, required: false, default: new DeepLearning()})
  deepLearning: DeepLearning;

  @Field(() => UserSocials, { nullable: true })
  @Prop({ type: Object, required: false, default: new UserSocials() })
  userSocials: UserSocials;

  @Field(() => SecuritySettings, { nullable: true })
  @Prop({ type: Object, required: false, default: new SecuritySettings() })
  settings: SecuritySettings;

  @Field({ nullable: true })
  @Prop({ required: false, default: false })
  confrimed: boolean;

  @Field({ nullable: true })
  @Prop({ required: false, default: '' })
  bio: string;

  @Field({ nullable: false })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
