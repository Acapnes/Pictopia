import { Type } from 'class-transformer';
import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsObject()
  category_picture_file?: {
    data: string;
    contentType: string;
  };

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;
}
