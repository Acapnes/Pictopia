import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = UserSocials & Document;

@Schema()
@ObjectType()
export class UserSocials {
  @Field({ nullable: true })
  @Prop({ required: false })
  instagram: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  github: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  steam: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  discord: string;
  
  @Field({ nullable: true })
  @Prop({ required: false })
  linkedin: string;
}

export const UserSocialsSchema = SchemaFactory.createForClass(UserSocials);
