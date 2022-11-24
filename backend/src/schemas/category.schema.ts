import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PictureFile } from './altSchemas/picture.file.schema';

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType('Category')
export class Category {
  @Field({ nullable: false })
  @Prop({ required: true })
  title: string;

  @Field(() => PictureFile, {
    nullable: false,
    defaultValue: { data: null, contentType: null },
  })
  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  category_picture_file: {
    data: string;
    contentType: string;
  };
}

export const CategorySchema = SchemaFactory.createForClass(Category);
