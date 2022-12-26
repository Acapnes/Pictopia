import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SecuritySettingsDocument = DeepLearning & Document;

@Schema()
@ObjectType()
export class DeepLearning {
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  searched: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  recentlyViewed: string[];
}

export const SecuritySettingsSchema =
  SchemaFactory.createForClass(DeepLearning);
