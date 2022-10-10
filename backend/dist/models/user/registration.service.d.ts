import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { RegistrationUserDto } from 'src/dto/user/registration.user.dto';
import { UserService } from './user.service';
export declare class RegistrationService {
    private userModel;
    private userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    createUser(registrationUserDto: RegistrationUserDto): Promise<Object>;
}
