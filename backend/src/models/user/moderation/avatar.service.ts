import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';

@Injectable()
export class AvatarService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService
  ) {}

  async changeAvatar(
    _id: mongoose.Types.ObjectId,
    avatar_file: any
  ): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          avatar: {
            data: avatar_file.buffer,
            contentType: avatar_file.mimetype,
          },
        }
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
        }
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

  async changeBackground(
    _id: mongoose.Types.ObjectId,
    background_file: any
  ): Promise<ReturnAuthDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          profile_background: {
            data: background_file.buffer,
            contentType: background_file.mimetype,
          },
        }
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
        }
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
}
