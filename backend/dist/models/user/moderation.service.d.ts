import mongoose, { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
export declare class ModerationService {
    private userModel;
    private userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    updateProfile(_id: mongoose.Types.ObjectId | any, userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto>;
    changeAvatar(_id: mongoose.Types.ObjectId | any, avatar_file: any): Promise<ReturnAuthDto>;
    removeAvatar(_id: mongoose.Types.ObjectId | any): Promise<ReturnAuthDto>;
}
