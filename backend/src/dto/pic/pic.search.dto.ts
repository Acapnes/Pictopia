import { IsNotEmpty, IsString } from 'class-validator';

export class PicSearchDto {
  @IsNotEmpty()
  @IsString()
  input: string;
}
