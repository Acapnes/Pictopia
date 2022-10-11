import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { PicCreateDto } from '../pic/pic.create.dto';
import { UserDto } from '../user/user.dto';

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
}
