import { UserDto } from 'src/dto/user/user.dto';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    getUsers(): Promise<User[]>;
    getUserByEmail(validationUserDto: ValidationUserDto): Promise<User>;
    userRegister(userDto: UserDto): Promise<User>;
    userLogin(validationUserDto: ValidationUserDto): Promise<any>;
}
