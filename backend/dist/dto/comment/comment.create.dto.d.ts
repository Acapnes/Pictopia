import mongoose from 'mongoose';
export declare class CommentCreateDto {
    destPicture: mongoose.Types.ObjectId;
    parentId?: mongoose.Types.ObjectId;
    comment: string;
    creationDate: Date;
}
