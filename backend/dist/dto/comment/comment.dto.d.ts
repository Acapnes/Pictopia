import mongoose from 'mongoose';
import { PicCreateDto } from '../pic/pic.create.dto';
import { UserDto } from '../user/user.dto';
export declare class CommentDto {
    _id: mongoose.Types.ObjectId;
    author: UserDto;
    destPicture: PicCreateDto;
    comment: string;
}
