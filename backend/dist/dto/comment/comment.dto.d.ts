import { Pic } from 'src/schemas/pic.schema';
import { UserDto } from '../user/user.dto';
export declare class CommentDto {
    author: UserDto;
    destPic: Pic;
    comment: string;
}
