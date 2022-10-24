import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class ModerationService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private userService: UserService) {}

  async updateProfile(_id: mongoose.Types.ObjectId | any,userUpdateDto: UserUpdateDto,): Promise<ReturnAuthDto> {
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return await this.userModel.findOneAndUpdate(
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
            .catch((err) => {
              return {
                access: false,
                message: 'Something went wrong! : ' + err,
                access_token: '',
              };
            });
        }
        return funcResult;
      });
  }

  async changeAvatar(_id: mongoose.Types.ObjectId | any,avatar_file: any): Promise<ReturnAuthDto>{
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
      if (funcResult.success !== false) {
        return await this.userModel.findOneAndUpdate(
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
      return funcResult;
    });
  }
}
