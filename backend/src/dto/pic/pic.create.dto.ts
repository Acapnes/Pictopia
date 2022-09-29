import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PicDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  like?: number = 0;

  @IsNumber()
  disslike?: number = 0;
}
