import { Field, ObjectType, Root } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { PictureFile } from './altSchemas/utils/picture.file.schema';
import { Category } from './category.schema';
import { User } from './user.schema';

export type PicDocument = Pic & Document;

@Schema()
@ObjectType()
export class Pic {
  _id?: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  authorPic: User;

  @Field({ nullable: false })
  @Prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  description: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  creationDate: Date;

  @Field(() => [String], { nullable: true })
  @Prop({ required: false })
  hashTags: string[];

  @Field(() => PictureFile, {
    nullable: false,
    defaultValue: { data: null, contentType: null },
  })
  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  picture_file: {
    data: Buffer;
    contentType: string;
  };

  @Field(() => [Category], { nullable: true, defaultValue: [] })
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: false,
    default: [],
  })
  categories: Category[];
}

export const PicSchema = SchemaFactory.createForClass(Pic);
