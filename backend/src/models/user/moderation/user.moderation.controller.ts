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
import { UserSavedPictureDto } from 'src/dto/user/user.saved.update.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { UserCategoryDto } from 'src/dto/user/utils/user.category.dto';
import { Category } from 'src/schemas/category.schema';
import { Pic } from 'src/schemas/pic.schema';
import { ModerationService } from './moderation.service';
import { SavedPicturesService } from './saved.pictures.service';
import { UserCategoryService } from './user.category.service';

@Controller('user/profile')
export class UserModerationController {
  constructor(
    private moderationService: ModerationService,
    private savedPicturesService: SavedPicturesService,
    private userCategoryService: UserCategoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/simple')
  async userProfileUpdate(
    @Request() req,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.updateProfile(req.user._id, userUpdateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async userChangeAvatar(
    @UploadedFile() avatar_file,
    @Request() req,
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.changeAvatar(req.user._id, avatar_file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update/avatar/remove')
  async userRemoveAvatar(
    @Request() req,
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.moderationService.removeAvatar(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/category')
  async listFavoriteCategories(
    @Request() req,
  ): Promise<ReturnFuncDto | Category[] | Category> {
    return this.userCategoryService.findUserAndPopulateFavCategories(
      req.user._id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/category/add')
  async setFavoriteCategory(
    @Request() req,
    @Body() userCategoryDto: UserCategoryDto,
  ) {
    return this.userCategoryService.setFavorieCategory(
      req.user._id,
      userCategoryDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/category/remove')
  async removeFavoriteCategory(@Request() req,@Body() userCategoryDto: UserCategoryDto): Promise<ReturnFuncDto | Category[] | Category> {
    return this.userCategoryService.removeFavoriteCategory(req.user._id,userCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/credentials')
  async fetchUserCredentials(
    @Request() req,
  ): Promise<UserCredentialsDto | ReturnFuncDto> {
    return this.moderationService.fetchUserCredentialsWithToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/saved')
  async getOneUser(@Request() req): Promise<ReturnFuncDto | Pic[] | Pic> {
    return this.savedPicturesService.findUserAndPopulateSavedPics(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/saved/add')
  async userSavePicture(
    @Request() req,
    @Body() userSavedPictureDto: UserSavedPictureDto,
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.savedPicturesService.savePicture(
      req.user._id,
      userSavedPictureDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/saved/remove')
  async userRemoveSavedPicture(
    @Request() req,
    @Body() userSavedPictureDto: UserSavedPictureDto,
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.savedPicturesService.removeSavedPicture(
      req.user._id,
      userSavedPictureDto,
    );
  }
}
