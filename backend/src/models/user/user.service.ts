import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';
import * as bcrypt from 'bcrypt';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(validationUserDto: ValidationUserDto): Promise<User> {
    return this.userModel.findOne({ email: validationUserDto.email });
  }

  async createUser(userDto: UserDto): Promise<User> {
    userDto.password = await bcrypt.hashSync(userDto.password, 10);
    return this.userModel.create(userDto);
  }

  async validateUser(validationUserDto: ValidationUserDto) {
    const hashedPassword = (await this.findByEmail(validationUserDto)).password.toString();
    const rawPassword = validationUserDto.password.toString();
    return await bcrypt.compareSync(rawPassword,hashedPassword,function (err, result) {});
  }
}
