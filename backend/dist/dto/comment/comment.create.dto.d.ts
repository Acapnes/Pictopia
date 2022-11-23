import mongoose from 'mongoose';
import { PicCreateDto } from '../pic/pic.create.dto';
export declare class CommentCreateDto {
    destPicture: PicCreateDto;
    parentId?: mongoose.Types.ObjectId;
    comment: string;
}
