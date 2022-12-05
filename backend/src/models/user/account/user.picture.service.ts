import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Pic } from 'src/schemas/pic.schema';
import { UserSavedPictureDto } from 'src/dto/user/saved/user.saved.pictures.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';

@Injectable()
export class UserPictureService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,private userService: UserService,
  ) {}

  async findUsersSavedPicture(_id: mongoose.Types.ObjectId,userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto> {
    return this.userModel.findOne({ _id: _id, savedPictures: userSavedPictureDto.picture_id })
      .then((result) => {
        if (result) {
          return {
            success: false,
            message: 'Picture already saved',
          };
        }
        return {
          success: true,
          message: 'Picture to save not found, can be saved',
        };
      });
  }

  async findUserAndPopulateSavedPics( userFindDto: UserFindDto): Promise<ReturnFuncDto | Pic[] | Pic> {
    return this.userModel.findOne({ username: userFindDto.username }).populate('savedPictures').then((result) => {
        if (!result) {
          return {
            success: false,
            message: 'User cannot found by name',
          };
        }
        return result.savedPictures;
      });
  }

  async savePicture(_id: mongoose.Types.ObjectId,userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto> {
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return await this.findUsersSavedPicture(_id,userSavedPictureDto,).then(async (pictureFindResult) => {
            if (pictureFindResult.success) {
              return await this.userModel.findOneAndUpdate(
                  { _id: _id },
                  {
                    $push: {
                      savedPictures: userSavedPictureDto.picture_id,
                    },
                  },
                )
                .then(async () => {
                  return {
                    success: true,
                    message: 'Picture saved',
                  };
                })
                .catch((err) => {
                  return {
                    success: false,
                    message: 'Something went wrong! : ' + err,
                  };
                });
            }
            return pictureFindResult;
          });
        }

        return funcResult;
      });
  }

  async removeSavedPicture(_id: mongoose.Types.ObjectId,userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto> {
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return await this.userModel.findOneAndUpdate(
              { _id: _id },
              {
                $pull: {
                  savedPictures: userSavedPictureDto.picture_id,
                },
              },
            )
            .then(async () => {
              return {
                success: true,
                message: 'Picture removed',
              };
            })
            .catch((err) => {
              return {
                success: false,
                message: 'Something went wrong! : ' + err,
              };
            });
        }
        return funcResult;
      });
  }
}
