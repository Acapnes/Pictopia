import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserService } from './user.service';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private userService: UserService) {}

  async createUser(userRegistrationDto: UserRegistrationDto): Promise<ReturnAuthDto> {
    const checkEmail = await this.userService.findByEmail(
      userRegistrationDto.email,
    );
    if (checkEmail != null)
      return {
        access: false,
        access_token:"",
        message: 'This email already been used',
      };

    userRegistrationDto.password = await bcrypt.hashSync(
      userRegistrationDto.password,
      10,
    );
    this.userModel.create(userRegistrationDto);
    return {
      access: true,
      access_token:"",
      message: 'User has been registered',
    };
  }

  async validateLoginUser(userValidationDto: UserValidationDto): Promise<ReturnAuthDto> {
    const selectedUser = await this.userService.findByEmail(userValidationDto.email);
    const rawPassword = userValidationDto.password.toString();
    const loginResult = bcrypt.compareSync(
      rawPassword,
      selectedUser.password.toString(),
    );
    if (loginResult) {
      return {
        access: true,
        message: 'Access verification successful',
        access_token: await this.userService.generateLoginToken(selectedUser),
      };
    } else {
      return {
        access: false,
        message: 'Access verification failed',
        access_token: '',
      };
    }
  }
}
