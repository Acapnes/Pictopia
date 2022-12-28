import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:username')
  async getUserProfileVeriables(
    @Param('username') username: string,
  ): Promise<User | ReturnFuncDto | UserDto> {
    return this.userService.findOneByUsername(username);
  }

  @Post('/find')
  async userFindByUsername(@Body() UserFindDto: UserFindDto) {
    return this.userService.findByLikeUsername(UserFindDto.username);
  }
}
