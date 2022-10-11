import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

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

  // @IsDate()
  @IsNotEmpty()
  birthDate!: string;

  @IsBoolean()
  confrimed?: boolean = false;

  @IsString()
  bio?: string ="";

  @IsString()
  @IsNotEmpty()
  password!: string;
}
