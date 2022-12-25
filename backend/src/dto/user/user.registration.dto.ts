import { Type } from 'class-transformer';
import { IsBoolean, IsDate,  IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegistrationDto {
  @IsString()
  name?: string = "";

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;

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
