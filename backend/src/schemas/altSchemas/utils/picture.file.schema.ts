import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PictureFileDocument = PictureFile & Document;

@Schema()
export class PictureFile {
  @Prop({ required: true, default: null })
  data: string;

  @Prop({ required: true, default: null })
  contentType: string;
}

export const PictureFileSchema = SchemaFactory.createForClass(PictureFile);
