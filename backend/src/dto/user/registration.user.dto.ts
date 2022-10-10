import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegistrationUserDto {
  @IsString()
  name?: string = "";

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  avatar?: string = "";

  // @IsString()
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
