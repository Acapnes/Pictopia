/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
export declare type PicDocument = Pic & Document;
export declare class Pic {
    authorPic: User;
    title: string;
    description: string;
    picture_file: {
        data: Buffer;
        contentType: string;
    };
    url: string;
}
export declare const PicSchema: mongoose.Schema<Pic, mongoose.Model<Pic, any, any, any, any>, {}, {}, {}, {}, "type", Pic>;
