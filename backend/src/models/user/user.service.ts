import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';
import * as bcrypt from 'bcrypt';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private jwtService: JwtService) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async generateLoginToken(userDto: UserDto) {
    return await this.jwtService.sign({
      name: userDto.name,
      username: userDto.username,
      email: userDto.email,
      birthDate: userDto.birthDate,
      avatar: userDto.avatar,
      bio: userDto.bio,
      confrimed: userDto.confrimed,
    });
  }

  async validateLoginUser(validationUserDto: ValidationUserDto) {
    const selectedUser = await this.findByEmail(validationUserDto.email);
    const rawPassword = validationUserDto.password.toString();
    const loginResult = bcrypt.compareSync(
      rawPassword,
      selectedUser.password.toString(),
    );
    if (loginResult) {
      return {
        access: true,
        message: 'Access verification successful',
        access_token: await this.generateLoginToken(selectedUser),
      };
    } else {
      return {
        access: false,
        message: 'Access verification failed',
      };
    }
  }
}
