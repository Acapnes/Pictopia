import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { AccountService } from './account.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('/user/account')
export class UserAccountController {
  constructor(private accountService: AccountService) {}

  @Post('/posted')
  async getUsersPostedPictures(@Body() userFindDto: UserFindDto) {
    return this.accountService.getUsersPostedPictures(userFindDto);
  }
}
