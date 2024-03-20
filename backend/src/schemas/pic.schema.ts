import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { PictureFile } from './altSchemas/utils/picture.file.schema';
import { Category } from './category.schema';
import { User } from './user.schema';

export type PicDocument = Pic & Document;

@Schema()
export class Pic {
  _id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  authorPic: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  creationDate: Date;

  @Prop({ required: false })
  hashTags: string[];

  @Prop({
    type: Object,
    required: true,
    default: { data: null, contentType: null },
  })
  picture_file: {
    data: Buffer;
    contentType: string;
  };

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: false,
    default: [],
  })
  categories: Category[];
}

export const PicSchema = SchemaFactory.createForClass(Pic);
