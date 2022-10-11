import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ReturnAuthDto {
  @IsBoolean()
  @IsNotEmpty()
  access: boolean;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
