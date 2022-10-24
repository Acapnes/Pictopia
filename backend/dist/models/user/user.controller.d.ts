import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
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
    userRegister(userRegistrationDto: UserRegistrationDto): Promise<ReturnAuthDto>;
    userLogin(userValidationdto: UserValidationDto): Promise<ReturnAuthDto>;
    userProfileUpdate(req: any, userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto | ReturnFuncDto>;
    userChangeAvatar(avatar_file: any, req: any): Promise<ReturnAuthDto | ReturnFuncDto>;
    fetchUserCredentials(req: any): Promise<UserCredentialsDto | ReturnFuncDto>;
}
