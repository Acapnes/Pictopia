import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user/user.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findOne(): Promise<User>;
    decodeUserByToken(token: string): Promise<ReturnFuncDto | User | UserDto>;
    findByEmail(email: string): Promise<UserDto | ReturnFuncDto>;
    findByLikeUsername(username: string): Promise<User[] | ReturnFuncDto | User>;
    findOneByUsername(username: string): Promise<ReturnFuncDto | User | UserDto>;
    findByMongooseId(_id: mongoose.Types.ObjectId): Promise<ReturnFuncDto | User | UserDto>;
    generateLoginToken(_id: mongoose.Types.ObjectId): Promise<string>;
    getUsersLastSearchedList(_id: mongoose.Types.ObjectId): Promise<User['deepLearning']['searched']>;
    saveToLastSearchs(_id: mongoose.Types.ObjectId, searchText: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
