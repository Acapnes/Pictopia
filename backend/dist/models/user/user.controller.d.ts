import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { ModerationService } from './moderation.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    private authService;
    private moderationService;
    constructor(usersService: UserService, authService: AuthService, moderationService: ModerationService);
    getUsers(): Promise<User[]>;
    userRegister(userRegistrationDto: UserRegistrationDto): Promise<import("../../dto/returns/return.auth.dto").ReturnAuthDto>;
    userLogin(userValidationdto: UserValidationDto): Promise<import("../../dto/returns/return.auth.dto").ReturnAuthDto>;
    userProfileUpdate(req: any): Promise<any>;
}
