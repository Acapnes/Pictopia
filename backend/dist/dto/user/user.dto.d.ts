/// <reference types="node" />
import mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { Pic } from 'src/schemas/pic.schema';
import { User } from 'src/schemas/user.schema';
export declare class UserDto {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    username: string;
    creationDate: Date;
    avatar: {
        data: Buffer;
        contentType: string;
    };
    confrimed: boolean;
    bio: string;
    password: string;
    settings: {
        privateAccount: boolean;
    };
    favCategories: Category[];
    savedPictures: Pic[];
    blockedUsers: User[];
    deepLearning: {
        lastSearches: string[];
    };
    userSocials: userSocialsInterface[];
}
export declare class userSocialsInterface {
    index: number;
    platform: string;
    url: string;
}
