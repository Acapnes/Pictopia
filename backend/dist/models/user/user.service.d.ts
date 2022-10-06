import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findByEmail(validationUserDto: ValidationUserDto): Promise<User>;
    createUser(userDto: UserDto): Promise<User>;
    validateUser(validationUserDto: ValidationUserDto): Promise<any>;
}
