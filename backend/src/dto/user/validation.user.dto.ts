import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidationUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
