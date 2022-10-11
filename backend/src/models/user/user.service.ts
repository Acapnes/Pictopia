import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserJwtDto } from 'src/dto/user/user.jwt.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async findByMongooseId(_id: mongoose.Types.ObjectId) {
    return this.userModel.findOne({ _id: _id });
  }

  async generateLoginToken(userJwtDto: UserJwtDto) {
    return await this.jwtService.sign({
      _id: userJwtDto._id,
      name: userJwtDto.name,
      username: userJwtDto.username,
      email: userJwtDto.email,
      birthDate: userJwtDto.birthDate,
      avatar: {
        data: userJwtDto.avatar.data,
        contentType: userJwtDto.avatar.contentType,
      },
      bio: userJwtDto.bio,
      confrimed: userJwtDto.confrimed,
    });
  }
}
