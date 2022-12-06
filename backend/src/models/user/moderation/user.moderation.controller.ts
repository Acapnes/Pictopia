import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserSocialsDto } from 'src/dto/user/utils/user.socials.dto';
import { ModerationService } from './moderation.service';

@Controller('user/profile')
export class UserModerationController {
  constructor(private moderationService: ModerationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/simple')
  async userProfileUpdate(
    @Request() req,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.updateProfile(req.user._id, userUpdateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async userChangeAvatar(
    @UploadedFile() avatar_file,
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.changeAvatar(req.user._id, avatar_file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/avatar/remove')
  async userRemoveAvatar(
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.removeAvatar(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/background')
  @UseInterceptors(FileInterceptor('background'))
  async userChangeBackground(
    @UploadedFile() background_file,
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.changeBackground(
      req.user._id,
      background_file
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/background/remove')
  async userRemoveBackground(
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.removeBackground(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/credentials')
  async fetchUserCredentials(
    @Request() req
  ): Promise<UserCredentialsDto | ReturnFuncDto> {
    return this.moderationService.fetchUserCredentialsWithToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/socials/update')
  async userSocialsUpdate(
    @Request() req,
    @Body() userSocialsDto: UserSocialsDto
  ): Promise<ReturnFuncDto> {
    return this.moderationService.userUpdateSocials(
      req.user._id,
      userSocialsDto
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/socials')
  async userFetchSocials(@Request() req): Promise<ReturnFuncDto | any> {
    return this.moderationService.userFetchSocials(req.user._id);
  }
}
