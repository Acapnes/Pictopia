import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SecuritySettingsDocument = Security & Document;

export class Security {
  @Prop({ type: Boolean, default: false })
  privateAccount: boolean;

  @Prop({ type: Boolean, default: false })
  notification: boolean;
}

export const SecuritySchema =
  SchemaFactory.createForClass(Security);
