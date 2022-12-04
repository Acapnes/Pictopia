import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  
  @Get('/:username')
  async getUserProfileVeriables(
    @Param('username') username: string,
  ): Promise<User | ReturnFuncDto | UserDto> {
    return this.usersService.findOneByUsername(username);
  }

  @Post('/find')
  async userFindByUsername(@Body() UserFindDto: UserFindDto) {
    return this.usersService.findByLikeUsername(UserFindDto.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/searched/last')
  async getUsersSearchedList(@Req() req): Promise<User['lastSearchs']> {
    return this.usersService.getUsersLastSearchedList(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/searched/last')
  async addUsersSearchedList(@Req() req){
    return this.usersService.saveToLastSearchs(req.user._id,"deneme");
  }
}
