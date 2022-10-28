/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
import { Pic } from './pic.schema';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    username: string;
    avatar: {
        data: Buffer;
        contentType: string;
    };
    savedPictures: Pic[];
    birthDate: string;
    confrimed: boolean;
    bio: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
