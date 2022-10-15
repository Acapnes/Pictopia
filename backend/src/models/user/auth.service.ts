import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserService } from './user.service';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';

@Injectable()
export class AuthService {constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private userService: UserService) {}

  async createUser(userRegistrationDto: UserRegistrationDto): Promise<ReturnAuthDto> {
    const checkEmail = await this.userService.findByEmail(userRegistrationDto.email) as ReturnFuncDto;
    if (checkEmail.success != false)
      return {
        access: false,
        access_token: '',
        message: 'This email already been used',
      };

    userRegistrationDto.password = await bcrypt.hashSync(
      userRegistrationDto.password,
      10,
    );
    this.userModel.create(userRegistrationDto);
    return {
      access: true,
      access_token: '',
      message: 'User has been registered',
    };
  }

  async validateLoginUser(userValidationDto: UserValidationDto): Promise<ReturnAuthDto> {
    return await this.userService.findByEmail(userValidationDto.email).then(async (findReturn : any) => {
        if (findReturn.success !== false) {
          const selectedUser = findReturn as UserDto;
          console.log(selectedUser)
          const rawPassword = userValidationDto.password.toString();
          const loginResult = bcrypt.compareSync(rawPassword,selectedUser.password.toString());
          if (loginResult) {
            return {
              access: true,
              message: 'Access verification successful',
              access_token: await this.userService.generateLoginToken(selectedUser._id),
            };
          } else {
            return {
              access: false,
              message: 'Access verification failed',
              access_token: '',
            };
          }
        }
        return findReturn;
      });
  }

  async fetchUserCredentialsWithToken(_id: mongoose.Types.ObjectId,): Promise<UserCredentialsDto>{
    return await this.userService.findByMongooseId(_id).then(async (funcResult: any) => {
        if (funcResult.success !== false) {
          return {
            name: funcResult.name,
            email: funcResult.email,
            username: funcResult.username,
            avatar: {
              data: funcResult.avatar.data,
              contentType: funcResult.avatar.contentType,
            },
            birthDate: funcResult.birthDate,
            confrimed: funcResult.confrimed,
            bio: funcResult.bio,
          };
        }
        return funcResult;
      });
  }
}
