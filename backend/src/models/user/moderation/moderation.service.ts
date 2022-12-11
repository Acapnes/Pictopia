import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { UserSocialsDto } from 'src/dto/user/utils/user.socials.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  async fetchUserCredentialsWithToken(_id: mongoose.Types.ObjectId): Promise<UserCredentialsDto> {
    return await this.userService
      .findByMongooseId(_id)
      .then(async (funcResult: any) => {
        return {
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
          profile_background:funcResult.profile_background,
          settings: funcResult.settings
        };
      });
  }

  async userUpdateSocials(_id: mongoose.Types.ObjectId,userSocialsDto: UserSocialsDto): Promise<ReturnFuncDto> {
    return await this.userModel
      .findOneAndUpdate({ _id: _id }, { $set: { userSocials: userSocialsDto } })
      .then(async () => {
        return {
          success: true,
          message: 'Your socials has been updated',
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: 'Something went wrong!',
        };
      });
  }

  async userFetchSocials(_id: mongoose.Types.ObjectId): Promise<User['userSocials'] | ReturnFuncDto> {
    return await this.userModel
      .findOne({ _id: _id })
      .then((user: User) => {
        return user.userSocials;
      })
      .catch(() => {
        return { success: false, message: 'Something went wrong!' };
      });
  }
}
