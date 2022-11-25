import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PicPaginationDto {
  @IsNotEmpty()
  @IsNumber()
  currentPage: number;

  @IsNotEmpty()
  @IsNumber()
  postPerPage: number;
}
