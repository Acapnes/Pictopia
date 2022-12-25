/// <reference types="node" />
import mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { Pic } from 'src/schemas/pic.schema';
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
    deepLearning: {
        searched: string[];
    };
}
