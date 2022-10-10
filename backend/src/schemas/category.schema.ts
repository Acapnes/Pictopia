import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Pic } from './pic.schema';
import { User } from './user.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Object,  required: true, default: { data: null, contentType: null }  })
  category_picture_file: {
    data: Buffer;
    contentType: string;
  };
}

export const CategorySchema = SchemaFactory.createForClass(Category);
