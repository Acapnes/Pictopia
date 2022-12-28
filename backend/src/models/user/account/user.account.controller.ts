import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnAuthDto } from 'src/dto/returns/return.auth.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserSavedPictureDto } from 'src/dto/user/saved/user.saved.pictures.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { UserCategoryDto } from 'src/dto/user/utils/user.category.dto';
import { Category } from 'src/schemas/category.schema';
import { Pic } from 'src/schemas/pic.schema';
import { UserPictureService } from './user.picture.service';
import { UserCategoryService } from './user.category.service';
import { UserCommentervice } from './user.comment.service';
import { PrivateGuard } from 'src/helpers/guards/private.guard';
import { PaginationDto } from 'src/dto/pic/pagination.dto';
import { UserService } from '../user.service';
import { UserCredentialsDto } from 'src/dto/user/user.credentials.dto';
import { UserAccountService } from './user.account.service';
import { User } from 'src/schemas/user.schema';

@Controller('/user/account')
export class UserAccountController {
  constructor(
    private userPictureService: UserPictureService,
    private userCategoryService: UserCategoryService,
    private userCommentervice: UserCommentervice,
    private userAccountService: UserAccountService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/credentials')
  async fetchUserCredentials(
    @Request() req
  ): Promise<UserCredentialsDto | ReturnFuncDto> {
    return this.userAccountService.fetchUserCredentialsWithToken(req.user);
  }

  // @UseGuards(PrivateGuard)
  @Post('/posted')
  async getUsersPostedPictures(@Body() userPostedPagination: PaginationDto) {
    return this.userPictureService.getUsersPostedPictures(userPostedPagination);
  }

  @UseGuards(PrivateGuard)
  @Post('/saved')
  async getOneUser(
    @Body() userPostedPagination: PaginationDto
  ): Promise<ReturnFuncDto | Pic[]> {
    return this.userPictureService.findUserAndPopulateSavedPics(
      userPostedPagination
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/saved/add')
  async userSavePicture(
    @Request() req,
    @Body() userSavedPictureDto: UserSavedPictureDto
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.userPictureService.savePicture(
      req.user._id,
      userSavedPictureDto
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/saved/remove')
  async userRemoveSavedPicture(
    @Request() req,
    @Body() userSavedPictureDto: UserSavedPictureDto
  ): Promise<ReturnAuthDto | ReturnFuncDto> {
    return this.userPictureService.removeSavedPicture(
      req.user._id,
      userSavedPictureDto
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/category')
  async listFavoriteCategories(
    @Request() req
  ): Promise<ReturnFuncDto | Category[] | Category> {
    return this.userCategoryService.findUserAndPopulateFavCategories(
      req.user._id
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/category/devided')
  async getAllCategoriesByDevidedUserFavorites(
    @Request() req
  ): Promise<ReturnFuncDto | Category[] | Category> {
    return this.userCategoryService.getAllCategoriesByDevidedUserFavorites(
      req.user._id
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/category/add')
  async setFavoriteCategory(
    @Request() req,
    @Body() userCategoryDto: UserCategoryDto
  ) {
    return this.userCategoryService.setFavorieCategory(
      req.user._id,
      userCategoryDto
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/category/remove')
  async removeFavoriteCategory(
    @Request() req,
    @Body() userCategoryDto: UserCategoryDto
  ): Promise<ReturnFuncDto | Category[] | Category> {
    return this.userCategoryService.removeFavoriteCategory(
      req.user._id,
      userCategoryDto
    );
  }

  @Post('/comments')
  async getUsersPostedComments(
    @Body() userFindDto: UserFindDto
  ): Promise<ReturnFuncDto | Pic[]> {
    return this.userCommentervice.findUserGetComments(userFindDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('recently/searched')
  async getUsersSearchedList(@Request() req): Promise<User['deepLearning']['lastSearches']> {
    return this.userAccountService.getUsersLastSearchedList(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('recently/searched/delete')
  async deleteUsersSearched(@Request() req, @Body() searchText: any): Promise<ReturnFuncDto> {
    return this.userAccountService.deleteFromLastSearches(req.user._id, searchText.searchText);
  }
}
