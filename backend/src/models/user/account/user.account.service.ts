import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { CategoryService } from 'src/models/category/category.service';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService
  ) {}

  async fetchUserCredentialsWithToken(
    _id: mongoose.Types.ObjectId
  ): Promise<UserCredentialsDto> {
    return await this.userService
      .findByMongooseId(_id)
      .then(async (funcResult: any) => {
        return {
          _id: funcResult._id,
          name: funcResult.name,
          email: funcResult.email,
          username: funcResult.username,
          avatar: {
            data: funcResult.avatar.data,
            contentType: funcResult.avatar.contentType,
          },
          birthDate: funcResult.birthDate,
          confrimed: funcResult.confrimed,
          bio: funcResult.bio,
          savedPictures: funcResult.savedPictures,
          userSocials: funcResult.userSocials,
          profile_background: funcResult.profile_background,
          settings: funcResult.settings,
        };
      });
  }

  async getUsersLastSearchedList(_id: mongoose.Types.ObjectId): Promise<User['deepLearning']['lastSearches']> {
    return (
      await this.userModel.findOne({ _id: _id })
    ).deepLearning?.lastSearches?.reverse();
  }

  async saveToLastSearches(_id: mongoose.Types.ObjectId, searchText: string) {
    return await this.userModel.findByIdAndUpdate(
      { _id: _id },
      {
        $push: {
          lastSearchs: searchText,
        },
      }
    );
  }

  
  async deleteFromLastSearches(_id: mongoose.Types.ObjectId, searchText: Object):Promise<ReturnFuncDto> {
    return await this.userModel.findByIdAndUpdate(
      { _id: _id },
      {
        $pull: {
          'deepLearning.lastSearches': searchText,
        },
      }
    ).then(()=>{
      return{
        success:true,
        message: "Search is deleted."
      }
    }).catch((err)=>{
      return{
        success:true,
        message: "Something went wrong."
      }
    })
  }
}
