import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Pic } from 'src/schemas/pic.schema';
import { UserDto } from '../user/user.dto';

export class CommentDto {
  @IsNotEmpty()
  author: UserDto;

  @IsNotEmpty()
  destPic: Pic;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
