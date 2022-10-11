import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  async updateProfile(userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto> {
    if (!(await this.userService.findByMongooseId(userUpdateDto._id)))
      return {
        access: false,
        access_token: null,
        message: 'User cannot found!',
      };

    return await this.userModel
      .findOneAndUpdate(
        { _id: userUpdateDto._id },
        {
          name: userUpdateDto.name,
          username: userUpdateDto.username,
          avatar: userUpdateDto.avatar,
          bio: userUpdateDto.bio,
          birthdate: userUpdateDto.birthDate,
        },
      )
      .then(async () => {
        return {
          access: true,
          message: 'Your profile has been changed!',
          access_token: await this.userService.generateLoginToken(userUpdateDto),
        };
      });
  }
}
