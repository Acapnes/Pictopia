import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserSocialsDocument = UserSocials & Document;

@Schema()
export class UserSocials {
  @Prop({ required: false, default: null })
  instagram: string;

  @Prop({ required: false, default: null })
  github: string;

  @Prop({ required: false, default: null })
  steam: string;

  @Prop({ required: false, default: null })
  discord: string;

  @Prop({ required: false, default: null })
  linkedin: string;
}

export const UserSocialsSchema = SchemaFactory.createForClass(UserSocials);
