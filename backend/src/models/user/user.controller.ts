import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import {  UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { ModerationService } from './moderation.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService, private authService: AuthService,private moderationService: ModerationService ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/signup')
  async userRegister(@Body() userRegistrationDto: UserRegistrationDto){
    return this.authService.createUser(userRegistrationDto);
  }

  @Post('/signin')
  async userLogin(@Body() userValidationdto: UserValidationDto){
    return this.authService.validateLoginUser(userValidationdto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/update')
  async userProfileUpdate(@Body() userUpdateDto: UserUpdateDto){
    return this.moderationService.updateProfile(userUpdateDto)
  }

}
