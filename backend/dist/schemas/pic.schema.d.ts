/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
export declare type PicDocument = Pic & Document;
export declare class Pic {
    authorPic: User;
    categories: mongoose.Schema.Types.ObjectId[];
    title: string;
    description: string;
    hashTags: string[];
    picture_file: {
        data: Buffer;
        contentType: string;
    };
}
export declare const PicSchema: mongoose.Schema<Pic, mongoose.Model<Pic, any, any, any, any>, {}, {}, {}, {}, "type", Pic>;
