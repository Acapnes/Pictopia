import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Pic } from './pic.schema';
import { User } from './user.schema';

export type CommentDocument = Comment & Document;

@Schema()
@ObjectType()
export class Comment {
  
  @Field(() => User, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Field(() => Pic, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pic' })
  destPicture: Pic;

  @Field(() => Comment, { nullable: true })
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  })
  parentId: string;

  @Field(() => User, { nullable: true })
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  likedUsers: [mongoose.Schema.Types.ObjectId]

  @Field({ nullable: false })
  @Prop({ required: true })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
