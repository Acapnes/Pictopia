import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class PicCreateDto {
  @IsNotEmpty()
  authorPic: UserDto;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  like?: number = 0;

  @IsNumber()
  disslike?: number = 0;
}
