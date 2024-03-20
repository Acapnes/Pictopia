import mongoose, { Document } from 'mongoose';
import { Pic } from './pic.schema';
import { User } from './user.schema';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    author: User;
    destPicture: Pic;
    parentId: string;
    creationDate: Date;
    likedUsers: [mongoose.Schema.Types.ObjectId];
    comment: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment>;
