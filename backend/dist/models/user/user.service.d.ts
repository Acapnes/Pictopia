import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    generateLoginToken(userDto: UserDto): Promise<string>;
    validateLoginUser(validationUserDto: ValidationUserDto): Promise<{
        access: boolean;
        message: string;
        access_token: string;
    } | {
        access: boolean;
        message: string;
        access_token?: undefined;
    }>;
}
