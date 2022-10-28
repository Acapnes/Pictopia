import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class PicDto {
  @IsNotEmpty()
  authorPic: UserDto;

  @IsNotEmpty()
  @IsString()
  title: string;

  description: string;

  @IsNotEmpty()
  @IsObject()
  picture_file: {
    data: Buffer;
    contentType: string;
  };
}
