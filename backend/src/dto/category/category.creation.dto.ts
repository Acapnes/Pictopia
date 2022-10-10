import { IsNotEmpty, IsString } from 'class-validator';
import { PicCreateDto } from '../pic/pic.create.dto';
import { UserDto } from '../user/user.dto';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

}
