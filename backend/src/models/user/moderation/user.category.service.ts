import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Category } from 'src/schemas/category.schema';
import { UserCategoryDto } from 'src/dto/user/utils/user.category.dto';

@Injectable()
export class UserCategoryService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  async findUsersFavoritedCategory(_id: mongoose.Types.ObjectId,userCategoryDto: UserCategoryDto): Promise<ReturnFuncDto> {
    return this.userModel.findOne({ _id: _id, favCategories: userCategoryDto.category_id })
      .then((result) => {
        if (result) {
          return {
            success: false,
            message: 'Category already favorited',
          };
        }
        return {
          success: true,
          message: 'Category can be favorited',
        };
      });
  }

  async findUserAndPopulateFavCategories(_id: mongoose.Types.ObjectId): Promise<ReturnFuncDto | Category[] | Category> {
    return this.userModel.findOne({ _id: _id }).populate('favCategories').then((result) => {
        if (!result) {
          return {
            success: false,
            message: 'User cannot found by id',
          };
        }
        return result.favCategories;
      });
  }

  async setFavorieCategory(_id: mongoose.Types.ObjectId,userCategoryDto: UserCategoryDto): Promise<ReturnFuncDto> {
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return this.findUsersFavoritedCategory(_id,userCategoryDto).then(async (findResult) => {
            if (findResult.success) {
              return await this.userModel
                .findOneAndUpdate(
                  { _id: _id },
                  {
                    $push: {
                      favCategories: userCategoryDto.category_id,
                    },
                  },
                )
                .then(async () => {
                  return {
                    success: true,
                    message: 'Category favorited',
                  };
                })
                .catch((err) => {
                  return {
                    success: false,
                    message: 'Something went wrong!',
                  };
                });
            }
            return findResult;
          });
        }
        return funcResult;
      });
  }

  async removeFavoriteCategory(_id: mongoose.Types.ObjectId, userCategoryDto: UserCategoryDto): Promise<ReturnFuncDto> {
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return await this.userModel.findOneAndUpdate(
              { _id: _id },
              {
                $pull: {
                  favCategories: userCategoryDto.category_id,
                },
              },
            )
            .then(async () => {
              return {
                success: true,
                message: 'Category removed from favorites',
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
