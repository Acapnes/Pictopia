import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = UserSocials & Document;

@Schema()
export class UserSocials {
  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false })
  github: string;

  @Prop({ required: false })
  steam: string;

  @Prop({ required: false })
  discord: string;
  
  @Prop({ required: false })
  linkedin: string;
}

export const UserSocialsSchema = SchemaFactory.createForClass(UserSocials);
