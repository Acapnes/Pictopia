import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { PicDto } from '../pic/pic.dto';

export class UserRegistrationDto {
  @IsString()
  name?: string = "";

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  avatar?: {
    data: Buffer;
    contentType: string;
  };

  @IsBoolean()
  confrimed?: boolean = false;

  @IsString()
  bio?: string ="";

  @IsString()
  @IsNotEmpty()
  password!: string;
}
