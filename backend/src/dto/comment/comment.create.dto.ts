import { IsNotEmpty, IsString } from 'class-validator';
import { PicCreateDto } from '../pic/pic.create.dto';

export class CommentCreateDto {

  @IsNotEmpty()
  destPicture: PicCreateDto;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
