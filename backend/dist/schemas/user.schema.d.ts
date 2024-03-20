/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
import { DeepLearning } from './altSchemas/user/user.learn.schema';
import { SecuritySettings } from './altSchemas/user/user.security.schema';
import { Category } from './category.schema';
import { Pic } from './pic.schema';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    username: string;
    creationDate: Date;
    avatar: {
        data: Buffer;
        contentType: string;
    };
    profile_background: {
        data: Buffer;
        contentType: string;
    };
    savedPictures: Pic[];
    favCategories: Category[];
    blockedUsers: User[];
    deepLearning: DeepLearning;
    userSocials: [
        {
            index: number;
            platform: string;
            url: string;
        }
    ];
    settings: SecuritySettings;
    confrimed: boolean;
    bio: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
