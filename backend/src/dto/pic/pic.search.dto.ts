import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PicSearchDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  input?: string;

  @IsNotEmpty()
  @IsNumber()
  currentPage: number;

  @IsNotEmpty()
  @IsNumber()
  postPerPage: number;
}
