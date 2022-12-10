/// <reference types="node" />
import mongoose from 'mongoose';
export declare class UserDto {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    username: string;
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
}
