import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
