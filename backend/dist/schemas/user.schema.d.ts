/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
import { SecuritySettings } from './altSchemas/user.security.schema';
import { UserSocials } from './altSchemas/user.socials.schema';
import { Category } from './category.schema';
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
    profile_background: {
        data: Buffer;
        contentType: string;
    };
    savedPictures: Pic[];
    favCategories: Category[];
    lastSearchs: string[];
    userSocials: UserSocials;
    userSecuritySettings: SecuritySettings;
    birthDate: string;
    confrimed: boolean;
    bio: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
