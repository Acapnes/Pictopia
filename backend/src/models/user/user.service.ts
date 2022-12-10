import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user/user.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('savedPictures').exec();
  }

  async findOne(): Promise<User> {
    return this.userModel.findOne({});
  }

  async findByEmail(email: string): Promise<UserDto | ReturnFuncDto> {
    return this.userModel.findOne({ email: email }).then((result) => {
      if (!result) {
        return {
          success: false,
          message: 'User cannot found by email',
        };
      }
      return result;
    });
  }

  async findByLikeUsername(
    username: string
  ): Promise<User[] | ReturnFuncDto | User> {
    return this.userModel
      .find({ username: { $regex: '.*' + username + '.*', $options: 'i' } })
      .then((result) => {
        if (!result) {
          return {
            success: false,
            message: 'User cannot found by username',
          };
        }
        return result;
      });
  }

  async findOneByUsername(
    username: string
  ): Promise<ReturnFuncDto | User | UserDto> {
    return this.userModel.findOne({ username: username }).then((result) => {
      if (!result) {
        return {
          success: false,
          message: 'User cannot found by username',
        };
      }
      return result;
    });
  }

  async findByMongooseId(
    _id: mongoose.Types.ObjectId
  ): Promise<ReturnFuncDto | User | UserDto> {
    return this.userModel.findOne({ _id: _id });
  }

  async generateLoginToken(_id: mongoose.Types.ObjectId): Promise<string> {
    return this.jwtService.sign({ _id: _id });
  }

  async getUsersLastSearchedList(
    _id: mongoose.Types.ObjectId
  ): Promise<User['lastSearchs']> {
    return (await this.userModel.findOne({ _id: _id })).lastSearchs;
  }

  async saveToLastSearchs(_id: mongoose.Types.ObjectId, searchText: string) {
    return await this.userModel.findByIdAndUpdate(
      { _id: _id },
      {
        $push: {
          lastSearchs: searchText,
        },
      }
    );
  }
}
