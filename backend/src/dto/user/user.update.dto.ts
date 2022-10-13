import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  avatar: {
    data: Buffer;
    contentType: string;
  };

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  bio: string;
}
