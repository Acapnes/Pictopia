import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { UserDto } from 'src/dto/user/user.dto';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { UserFindDto } from 'src/dto/user/user.find.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
  ) {}

  async getUsersPostedPictures(userFindDto: UserFindDto): Promise<Pic[] | any> {
    return this.userService.findOneByUsername(userFindDto.username).then(async (user: UserDto) => {
        return (await this.picModel.find({ authorPic: user._id })).reverse();
      });
  }
}
