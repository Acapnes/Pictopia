import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  input?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsNumber()
  currentPage: number;

  @IsNotEmpty()
  @IsNumber()
  postPerPage: number;
}
