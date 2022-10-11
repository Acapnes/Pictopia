import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserJwtDto } from 'src/dto/user/user.jwt.dto';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findByMongooseId(_id: mongoose.Types.ObjectId): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    generateLoginToken(userJwtDto: UserJwtDto): Promise<string>;
}
