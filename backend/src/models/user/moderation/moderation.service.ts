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
        };
      });
  }

  async updateProfile(_id: mongoose.Types.ObjectId | any,userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          name: userUpdateDto.name,
          username: userUpdateDto.username,
          bio: userUpdateDto.bio,
          birthDate: userUpdateDto.birthDate,
        },
      )
      .then(async () => {
        return {
          access: true,
          message: 'Your profile has been updated!',
          access_token: await this.userService.generateLoginToken(_id),
        };
      })
      .catch(() => {
        return {
          access: false,
          message: 'Something went wrong! : ',
          access_token: '',
        };
      });
  }

  async changeAvatar(_id: mongoose.Types.ObjectId, avatar_file: any): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          avatar: {
            data: avatar_file.buffer,
            contentType: avatar_file.mimetype,
          },
        },
      )
      .then(async () => {
        return {
          access: true,
          message: 'Your avatar has been changed!',
          access_token: await this.userService.generateLoginToken(_id),
        };
      })
      .catch((err) => {
        return {
          access: false,
          message: 'Something went wrong! : ' + err,
          access_token: '',
        };
      });
  }

  async removeAvatar(_id: mongoose.Types.ObjectId): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          avatar: {
            data: null,
            contentType: null,
          },
        },
      )
      .then(async () => {
        return {
          access: true,
          message: 'Your avatar has been removed!',
          access_token: await this.userService.generateLoginToken(_id),
        };
      })
      .catch((err) => {
        return {
          access: false,
          message: 'Something went wrong!',
          access_token: '',
        };
      });
  }

  async changeBackground(_id: mongoose.Types.ObjectId, background_file: any): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          profile_background: {
            data: background_file.buffer,
            contentType: background_file.mimetype,
          },
        },
      )
      .then(async () => {
        return {
          access: true,
          message: 'Your avatar has been changed!',
          access_token: await this.userService.generateLoginToken(_id),
        };
      })
      .catch((err) => {
        return {
          access: false,
          message: 'Something went wrong! : ' + err,
          access_token: '',
        };
      });
  }

  async removeBackground(_id: mongoose.Types.ObjectId): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          profile_background: {
            data: null,
            contentType: null,
          },
        },
      )
      .then(async () => {
        return {
          access: true,
          message: 'Your avatar has been removed!',
          access_token: await this.userService.generateLoginToken(_id),
        };
      })
      .catch((err) => {
        return {
          access: false,
          message: 'Something went wrong!',
          access_token: '',
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
