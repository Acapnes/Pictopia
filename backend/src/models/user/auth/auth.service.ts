import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserService } from '../user.service';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';

@Injectable()
export class AuthService {constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  private userService: UserService) {}

  async createUser(userRegistrationDto: UserRegistrationDto): Promise<ReturnAuthDto> {
    const checkEmail = await this.userService.findByEmail(userRegistrationDto.email) as ReturnFuncDto;
    if (checkEmail.success != false)
    return {
      access: false,
      access_token: '',
      message: 'This email already been used',
    };

    let passwordCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if(!userRegistrationDto.password.match(passwordCheck)){
      return{
        access: false,
        access_token: '',
        message: 'Password must be within the specified conditions',
      }
    }
    
    userRegistrationDto.password = await bcrypt.hashSync(userRegistrationDto.password,10);
    
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

  async validateUserEmailPassword(userValidationDto: UserValidationDto): Promise<ReturnFuncDto> {
    return await this.userService.findByEmail(userValidationDto.email).then(async (findReturn : any) => {
        if (findReturn.success !== false) {
          const selectedUser = findReturn as UserDto;
          const rawPassword = userValidationDto.password.toString();
          const loginResult = bcrypt.compareSync(rawPassword,selectedUser.password.toString());
          if (loginResult) {
            return {
              success: true,
              message: 'Access verification successful',
            };
          } else {
            return {
              success: false,
              message: 'Access verification failed',
            };
          }
        }
        return findReturn;
      });
  }
}
