import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserSavedPictureDto } from 'src/dto/user/user.saved.update.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { Pic } from 'src/schemas/pic.schema';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { ModerationService } from './moderation.service';
import { SavedPicturesService } from './saved.pictures.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    private authService;
    private moderationService;
    private savedPicturesService;
    constructor(usersService: UserService, authService: AuthService, moderationService: ModerationService, savedPicturesService: SavedPicturesService);
    getUsers(): Promise<User[]>;
    userRegister(userRegistrationDto: UserRegistrationDto): Promise<ReturnAuthDto>;
    userLogin(userValidationdto: UserValidationDto): Promise<ReturnAuthDto>;
    userFindBuUsername(UserFindDto: UserFindDto): Promise<ReturnFuncDto | UserDto[]>;
    test(req: any, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto>;
    userProfileUpdate(req: any, userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto | ReturnFuncDto>;
    getOneUser(req: any): Promise<ReturnFuncDto | Pic[] | Pic>;
    userSavePicture(req: any, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnAuthDto | ReturnFuncDto>;
    userRemoveSavedPicture(req: any, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnAuthDto | ReturnFuncDto>;
    userChangeAvatar(avatar_file: any, req: any): Promise<ReturnAuthDto | ReturnFuncDto>;
    userRemoveAvatar(req: any): Promise<ReturnAuthDto | ReturnFuncDto>;
    fetchUserCredentials(req: any): Promise<UserCredentialsDto | ReturnFuncDto>;
}
