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
import { UserDto } from 'src/dto/user/user.dto';
import { AvatarService } from './avatar.service';
import { ModerationService } from './moderation.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user/profile')
export class UserModerationController {
  constructor(
    private moderationService: ModerationService,
    private avatarService: AvatarService
  ) {}

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async userChangeAvatar(
    @UploadedFile() avatar_file,
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.avatarService.changeAvatar(req.user._id, avatar_file);
  }

  @Post('/avatar/remove')
  async userRemoveAvatar(
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.avatarService.removeAvatar(req.user._id);
  }

  @Post('/background')
  @UseInterceptors(FileInterceptor('background'))
  async userChangeBackground(
    @UploadedFile() background_file,
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.avatarService.changeBackground(req.user._id, background_file);
  }

  @Post('/background/remove')
  async userRemoveBackground(
    @Request() req
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.avatarService.removeBackground(req.user._id);
  }

  @Get('/socials')
  async userFetchSocials(@Request() req): Promise<ReturnFuncDto | any> {
    return this.moderationService.userFetchSocials(req.user._id);
  }

  @Post('/socials/update')
  async userSocialsUpdate(
    @Request() req,
    @Body() userSocialsDto: UserDto['userSocials'][0]
  ): Promise<ReturnFuncDto> {
    return this.moderationService.userUpdateSocials(
      req.user._id,
      userSocialsDto
    );
  }

  @Post('/socials/delete')
  async userSocialsDelete(
    @Request() req,
    @Body() userSocialsDto: UserDto['userSocials'][0]
  ): Promise<ReturnFuncDto> {
    return this.moderationService.userDeleteSocial(req.user._id,userSocialsDto);
  }

}
