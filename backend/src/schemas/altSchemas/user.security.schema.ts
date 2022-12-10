import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SecuritySettingsDocument = SecuritySettings & Document;

@Schema()
@ObjectType()
export class SecuritySettings {
  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: true })
  privateAccount: boolean;
}

export const SecuritySettingsSchema =
  SchemaFactory.createForClass(SecuritySettings);
