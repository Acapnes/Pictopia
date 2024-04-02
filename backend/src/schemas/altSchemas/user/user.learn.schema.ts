import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SecuritySettingsDocument = DeepLearning & Document;

@Schema()
export class DeepLearning {
  @Prop({ type: [String], default: [] })
  lastSearches: string[];

  @Prop({ type: [String], default: [] })
  recentlyViewed: string[];
}

export const SecuritySettingsSchema =
  SchemaFactory.createForClass(DeepLearning);
