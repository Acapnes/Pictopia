import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    create(userDto: UserDto): Promise<User>;
}
