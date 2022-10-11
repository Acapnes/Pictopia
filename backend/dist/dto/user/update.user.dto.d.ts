import mongoose from 'mongoose';
export declare class UserUpdateDto {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    username: string;
    avatar: string;
    birthDate: string;
    confrimed: boolean;
    bio: string;
    password: string;
}
