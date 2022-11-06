import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserSavedPictureDto } from 'src/dto/user/user.saved.update.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { Pic } from 'src/schemas/pic.schema';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { ModerationService } from './moderation.service';
import { SavedPicturesService } from './saved.pictures.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private authService: AuthService,
    private moderationService: ModerationService,
    private savedPicturesService:SavedPicturesService
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/signup')
  async userRegister(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.createUser(userRegistrationDto);
  }

  @Post('/signin')
  async userLogin(@Body() userValidationdto: UserValidationDto) {
    return this.authService.validateLoginUser(userValidationdto);
  }

  @Post('/find')
  async userFindByUsername(@Body() UserFindDto: UserFindDto) {
    return this.usersService.findByUsername(UserFindDto.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/update/simple')
  async userProfileUpdate(@Request() req, @Body() userUpdateDto: UserUpdateDto): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.updateProfile(req.user._id ,userUpdateDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile/saved')
  async getOneUser(@Request() req): Promise<ReturnFuncDto | Pic[] | Pic> {
    return this.savedPicturesService.findUserAndPopulateSavedPics(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/saved/add')
  async userSavePicture(@Request() req, @Body() userSavedPictureDto: UserSavedPictureDto): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.savedPicturesService.savePicture(req.user._id ,userSavedPictureDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/saved/remove')
  async userRemoveSavedPicture(@Request() req, @Body() userSavedPictureDto: UserSavedPictureDto): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.savedPicturesService.removeSavedPicture(req.user._id ,userSavedPictureDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/update/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async userChangeAvatar(@UploadedFile() avatar_file, @Request() req): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.changeAvatar(req.user._id, avatar_file)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/update/avatar/remove')
  async userRemoveAvatar(@Request() req): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.removeAvatar(req.user._id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/credentials')
  async fetchUserCredentials(@Request() req): Promise<UserCredentialsDto | ReturnFuncDto> {
    return this.authService.fetchUserCredentialsWithToken(req.user);
  }
}
