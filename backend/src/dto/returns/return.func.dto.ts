import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ReturnFuncDto {
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;
  
  @IsString()
  @IsNotEmpty()
  message: string;
}
