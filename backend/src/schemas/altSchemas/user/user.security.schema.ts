import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SecuritySettingsDocument = SecuritySettings & Document;

export class SecuritySettings {
  @Prop({ type: Boolean, default: false })
  privateAccount: boolean;

  @Prop({ type: Boolean, default: false })
  notification: boolean;
}

export const SecuritySettingsSchema =
  SchemaFactory.createForClass(SecuritySettings);
