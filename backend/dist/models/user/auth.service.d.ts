import mongoose, { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserService } from './user.service';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
export declare class AuthService {
    private userModel;
    private userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    createUser(userRegistrationDto: UserRegistrationDto): Promise<ReturnAuthDto>;
    validateLoginUser(userValidationDto: UserValidationDto): Promise<ReturnAuthDto>;
    fetchUserCredentialsWithToken(_id: mongoose.Types.ObjectId): Promise<UserCredentialsDto>;
}
