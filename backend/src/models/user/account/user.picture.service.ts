import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { UserSavedPictureDto } from 'src/dto/user/saved/user.saved.pictures.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { PaginationDto } from 'src/dto/pic/pagination.dto';

@Injectable()
export class UserPictureService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
    private userService: UserService
  ) {}

  async getUsersPostedPictures(
    userPostedPagination: PaginationDto
  ): Promise<Pic[]> {
    return this.userService
      .findOneByUsername(userPostedPagination.username)
      .then(async (user: UserDto) => {
        return (
          await this.picModel
            .find({ authorPic: user._id })
            .skip(
              Math.ceil(
                userPostedPagination.currentPage *
                  userPostedPagination.postPerPage
              )
            )
            .limit(userPostedPagination.postPerPage)
            .populate('authorPic')
        ).reverse();
      });
  }

  async findUsersSavedPicture(
    _id: mongoose.Types.ObjectId,
    userSavedPictureDto: UserSavedPictureDto
  ): Promise<ReturnFuncDto> {
    return this.userModel
      .findOne({ _id: _id, savedPictures: userSavedPictureDto.picture_id })
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

  async findUserAndPopulateSavedPics(userPostedPagination: PaginationDto): Promise<ReturnFuncDto | Pic[]> {
    return this.userModel.findOne({ username: userPostedPagination.username })
      .populate({ path: 'savedPictures', populate: [{ path: 'authorPic' }] })
      .then((result) => {
        if (!result) {
          return {
            success: false,
            message: 'User cannot found by name',
          };
        }
        return result.savedPictures.reverse().slice(
          userPostedPagination.currentPage * userPostedPagination.postPerPage,
          (userPostedPagination.currentPage + 1) *
            userPostedPagination.postPerPage
        );
      });
  }

  async savePicture(
    _id: mongoose.Types.ObjectId,
    userSavedPictureDto: UserSavedPictureDto
  ): Promise<ReturnFuncDto> {
    return await this.userService
      .findByMongooseId(_id)
      .then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return await this.findUsersSavedPicture(
            _id,
            userSavedPictureDto
          ).then(async (pictureFindResult) => {
            if (pictureFindResult.success) {
              return await this.userModel
                .findOneAndUpdate(
                  { _id: _id },
                  {
                    $push: {
                      savedPictures: userSavedPictureDto.picture_id,
                    },
                  }
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

  async removeSavedPicture(_id: mongoose.Types.ObjectId, userSavedPictureDto: UserSavedPictureDto): Promise<ReturnFuncDto> {
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return await this.userModel
            .findOneAndUpdate(
              { _id: _id },
              {
                $pull: {
                  savedPictures: userSavedPictureDto.picture_id,
                },
              }
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
