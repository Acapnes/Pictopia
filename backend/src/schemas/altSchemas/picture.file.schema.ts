import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PictureFileDocument = PictureFile & Document;

@Schema()
@ObjectType()
export class PictureFile {
  @Field({ nullable: false, defaultValue: null })
  @Prop({ required: true, default: null })
  data: string;

  @Field({ nullable: false, defaultValue: null })
  @Prop({ required: true, default: null })
  contentType: string;
}

export const PictureFileSchema = SchemaFactory.createForClass(PictureFile);
