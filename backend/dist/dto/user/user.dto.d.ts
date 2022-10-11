import mongoose from 'mongoose';
export declare class UserDto {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    username: string;
    avatar: string;
    birthDate: string;
    confrimed: boolean;
    bio: string;
    password: string;
}
