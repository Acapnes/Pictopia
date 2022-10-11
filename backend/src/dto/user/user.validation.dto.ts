import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserValidationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
