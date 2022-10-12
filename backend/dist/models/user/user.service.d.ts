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
    findByEmail(email: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findByMongooseId(_id: mongoose.Types.ObjectId): Promise<UserDto | ReturnFuncDto>;
    generateLoginToken(_id: mongoose.Types.ObjectId): Promise<string>;
}
