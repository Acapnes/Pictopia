import { IsBoolean, IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsObject()
  avatar: {
    data: Buffer;
    contentType: string;
  };

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsBoolean()
  @IsNotEmpty()
  confrimed: boolean;

  @IsString()
  bio: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
