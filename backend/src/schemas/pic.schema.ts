import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { User } from './user.schema';

export type PicDocument = Pic & Document;

@Schema()
export class Pic {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  authorPic: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  like: number;

  @Prop({ required: false })
  disslike: number;

  @Prop({ type: Object,  required: true, default: { data: null, contentType: null }  })
  picture_file: {
    data: Buffer;
    contentType: string;
  };

  @Prop({ required: false })
  url: string;
}

export const PicSchema = SchemaFactory.createForClass(Pic);
