import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    getUsers(): Promise<User[]>;
    getUserProfileVeriables(username: string): Promise<User | ReturnFuncDto | UserDto>;
    userFindByUsername(UserFindDto: UserFindDto): Promise<User | ReturnFuncDto | User[]>;
    getUsersSearchedList(req: any): Promise<User['deepLearning']['searched']>;
}
