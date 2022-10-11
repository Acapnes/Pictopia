import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
export declare class ModerationService {
    private userModel;
    private userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    updateProfile(userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto>;
}
