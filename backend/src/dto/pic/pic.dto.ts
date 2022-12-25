import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class PicDto {
  @IsNotEmpty()
  authorPic: UserDto;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;

  @IsNotEmpty()
  @IsObject()
  picture_file: {
    data: Buffer;
    contentType: string;
  };
}
