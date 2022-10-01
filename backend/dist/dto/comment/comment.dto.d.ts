import { PicCreateDto } from '../pic/pic.create.dto';
import { UserDto } from '../user/user.dto';
export declare class CommentDto {
    author: UserDto;
    destPicture: PicCreateDto;
    comment: string;
}
