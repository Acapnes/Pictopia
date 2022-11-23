import mongoose, { Document } from 'mongoose';
import { Pic } from './pic.schema';
import { User } from './user.schema';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    author: User;
    destPicture: Pic;
    parentId: string;
    comment: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, "type", Comment>;
