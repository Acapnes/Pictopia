import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from './comment.schema';

export type PicDocument = Pic & Document;

@Schema()
export class Pic {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  like: number;

  @Prop({ required: false })
  disslike: number;

  @Prop({ required: false })
  comments: [Comment];
}

export const PicSchema = SchemaFactory.createForClass(Pic);
