import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PictureFile } from './altSchemas/picture.file.schema';
import { UserSocials } from './altSchemas/user.socials.schema';
import { Category } from './category.schema';
import { Pic } from './pic.schema';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field({ nullable: true })
  @Prop({ required: false })
  name: string;

  @Field({ nullable: false })
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: false })
  @Prop({ required: true, unique: true })
  username: string;

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

  @Field(() => [Pic], { nullable: false })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Pic', required: false })
  savedPictures: Pic[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: false,
  })
  favCategories: Category[];

  @Field(() => UserSocials, { nullable: false })
  @Prop({ type: Object, required: false })
  userSocials: UserSocials;

  @Field({ nullable: false })
  @Prop({ required: true })
  birthDate: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  confrimed: boolean;

  @Field({ nullable: true })
  @Prop({ required: false })
  bio: string;

  @Field({ nullable: false })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
