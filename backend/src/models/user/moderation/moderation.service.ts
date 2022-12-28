import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService
  ) {}

  async userFetchSocials(
    _id: mongoose.Types.ObjectId
  ): Promise<User['userSocials'] | ReturnFuncDto> {
    return await this.userModel
      .findOne({ _id: _id })
      .then((user: User) => {
        return user.userSocials;
      })
      .catch(() => {
        return { success: false, message: 'Something went wrong!' };
      });
  }

  async userUpdateSocials(
    _id: mongoose.Types.ObjectId,
    userSocialsDto: UserDto['userSocials'][0]
  ): Promise<ReturnFuncDto> {
    if (!userSocialsDto.platform || !userSocialsDto.url) {
      return {
        success: true,
        message: 'Please fill in the blanks',
      };
    }

    return await this.userService
      .findByMongooseId(_id)
      .then(async (user: UserDto) => {
        if (user.userSocials.length >= 10) {
          return {
            success: false,
            message:
              'The limit for adding social media links has been reached.',
          };
        }

        return await this.userModel
          .findOneAndUpdate(
            { _id: _id },
            {
              $push: {
                userSocials: {
                  index: await this.userService
                    .findByMongooseId(_id)
                    .then((user: UserDto) => {
                      if (user.userSocials[0])
                        return (
                          user.userSocials[user.userSocials.length - 1].index +
                          1
                        );
                      return 1;
                    }),
                  platform: userSocialsDto.platform,
                  url: userSocialsDto.url,
                },
              },
            }
          )
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
      });
  }

  async userDeleteSocial(
    _id: mongoose.Types.ObjectId,
    userSocialsDto: UserDto['userSocials'][0]
  ): Promise<ReturnFuncDto> {
    return await this.userModel
      .updateOne(
        { _id: _id },
        {
          $pull: {
            userSocials: { index: userSocialsDto.index },
          },
        }
      )
      .then(async () => {
        return {
          success: true,
          message: `${userSocialsDto.platform} has been deleted`,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: 'Something went wrong!' + err,
        };
      });
  }
}
