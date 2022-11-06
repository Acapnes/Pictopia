import mongoose, { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Pic } from 'src/schemas/pic.schema';
import { UserSavedPictureDto } from 'src/dto/user/user.saved.update.dto';
export declare class SavedPicturesService {
    private userModel;
    private userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    findUsersSavedPicture(_id: mongoose.Types.ObjectId, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto>;
    findUserAndPopulateSavedPics(_id: mongoose.Types.ObjectId): Promise<ReturnFuncDto | Pic[] | Pic>;
    savePicture(_id: mongoose.Types.ObjectId, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto>;
    removeSavedPicture(_id: mongoose.Types.ObjectId, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto>;
}
