import { RegistrationUserDto } from 'src/dto/user/registration.user.dto';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';
import { User } from 'src/schemas/user.schema';
import { RegistrationService } from './registration.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    private registrationService;
    constructor(usersService: UserService, registrationService: RegistrationService);
    getUsers(): Promise<User[]>;
    userRegister(registrationUserDto: RegistrationUserDto): Promise<Object>;
    userLogin(validationUserDto: ValidationUserDto): Promise<{
        access: boolean;
        message: string;
        access_token: string;
    } | {
        access: boolean;
        message: string;
        access_token?: undefined;
    }>;
}
