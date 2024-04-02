import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CategoryCreationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsObject()
  category_picture_file: {
    data: Buffer;
    contentType: string;
  };
  
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;
}
