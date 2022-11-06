import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user/user.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findOne(): Promise<User>;
    findByEmail(email: string): Promise<UserDto | ReturnFuncDto>;
    findByUsername(username: string): Promise<UserDto[] | ReturnFuncDto>;
    findByMongooseId(_id: mongoose.Types.ObjectId): Promise<ReturnFuncDto | UserDto | ReturnAuthDto>;
    generateLoginToken(_id: mongoose.Types.ObjectId): Promise<Object>;
}
