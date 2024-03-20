import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Pic } from './pic.schema';
import { User } from './user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pic' })
  destPicture: Pic;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  })
  parentId: string;

  @Prop({ required: true })
  creationDate: Date;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  likedUsers: [mongoose.Schema.Types.ObjectId]

  @Prop({ required: true })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
