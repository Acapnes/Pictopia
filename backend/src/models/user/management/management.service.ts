import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import * as bcrypt from 'bcrypt';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async updateProfile(_id: mongoose.Types.ObjectId, userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          name: userUpdateDto.name,
          username: userUpdateDto.username,
          bio: userUpdateDto.bio,
          birthDate: userUpdateDto.birthDate,
        }
      )
      .then(async () => {
        return {
          success: true,
          message: 'Your profile has been updated!',
        };
      })
      .catch(() => {
        return {
          success: false,
          message: 'Something went wrong!',
        };
      });
  }

  async updateEmail(_id: mongoose.Types.ObjectId, userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    if (!userUpdateDto.newEmail || !userUpdateDto.password || !userUpdateDto.email) {
      return {
        success: false,
        message: 'Please fill in the blanks',
      };
    }

    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          email: userUpdateDto.newEmail,
        }
      )
      .then(async () => {
        return {
          success: true,
          message: 'Your email has been updated!',
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: 'Something went wrong! '+ err,
        };
      });
  }

  async updatePassword(_id: mongoose.Types.ObjectId,userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    if (!userUpdateDto.newPassword) {
      return {
        success: false,
        message: 'New password cannot be empty',
      };
    }

    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          password: await bcrypt.hashSync(userUpdateDto.newPassword, 10),
        }
      )
      .then(async () => {
        return {
          success: true,
          message: 'Your password has been updated!',
        };
      })
      .catch(() => {
        return {
          success: false,
          message: 'Something went wrong!',
        };
      });
  }

  async deleteUserAndConnections(_id: mongoose.Types.ObjectId | any, userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    return await this.userModel
      .findOneAndDelete({ _id: _id })
      .then(async () => {
        return await this.picModel
          .deleteMany({ authorPic: _id })
          .then(async () => {
            return await this.commentModel
              .deleteMany({ author: _id })
              .then(async () => {
                return await this.userModel
                  .findOne({ _id: _id })
                  .then((user: UserDto) => {
                    if (!user) {
                      return {
                        success: true,
                        message: 'Account has been deleted.',
                      };
                    }
                    return {
                      success: false,
                      message: 'Something went wrong!',
                    };
                  });
              });
          });
      });
  }

  async updateSettings(_id: mongoose.Types.ObjectId, userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          settings: userUpdateDto.settings,
        }
      )
      .then(async () => {
        return {
          success: true,
          message: 'Your settings has been updated!',
        };
      })
      .catch(() => {
        return {
          success: false,
          message: 'Something went wrong! ',
        };
      });
  }

  async userBlocking(_id: mongoose.Types.ObjectId, userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          blockedUsers: userUpdateDto.settings,
        }
      )
      .then(async () => {
        return {
          success: true,
          message: 'Your settings has been updated!',
        };
      })
      .catch(() => {
        return {
          success: false,
          message: 'Something went wrong! ',
        };
      });
  }
}
