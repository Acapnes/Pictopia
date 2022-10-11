import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class PicCreateDto {
  @IsNotEmpty()
  authorPic: UserDto;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsObject()
  picture_file: {
    data: Buffer;
    contentType: string;
  };

  // @IsNumber()
  // like?: number = 0;

  // @IsNumber()
  // disslike?: number = 0;
}
