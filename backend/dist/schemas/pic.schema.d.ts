/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
export declare type PicDocument = Pic & Document;
export declare class Pic {
    _id?: string;
    authorPic: User;
    title: string;
    description: string;
    creationDate: Date;
    hashTags: string[];
    picture_file: {
        data: Buffer;
        contentType: string;
    };
    categories: mongoose.Schema.Types.ObjectId[];
}
export declare const PicSchema: mongoose.Schema<Pic, mongoose.Model<Pic, any, any, any, any>, {}, {}, {}, {}, "type", Pic>;
