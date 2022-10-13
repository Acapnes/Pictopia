/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: Object,  required: true, default: { data: null, contentType: null }})
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: false })
  confrimed: boolean;

  @Prop({ required: false })
  bio: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
