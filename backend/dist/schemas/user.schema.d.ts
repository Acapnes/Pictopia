import mongoose, { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
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
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
