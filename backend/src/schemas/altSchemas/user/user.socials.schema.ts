import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserSocialsDocument = UserSocials & Document;

@Schema()
@ObjectType()
export class UserSocials {
  @Field({ nullable: true })
  @Prop({ required: false, default: null })
  instagram: string;

  @Field({ nullable: true })
  @Prop({ required: false, default: null })
  github: string;

  @Field({ nullable: true })
  @Prop({ required: false, default: null })
  steam: string;

  @Field({ nullable: true })
  @Prop({ required: false, default: null })
  discord: string;

  @Field({ nullable: true })
  @Prop({ required: false, default: null })
  linkedin: string;
}

export const UserSocialsSchema = SchemaFactory.createForClass(UserSocials);
