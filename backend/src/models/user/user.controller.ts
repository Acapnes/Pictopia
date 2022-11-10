import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
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

  @Get(':username')
  async getUserProfileVeriables(
    @Param('username') username: string,
  ): Promise<User | ReturnFuncDto> {
    return this.usersService.findOneByUsername(username);
  }

  @Post('/find')
  async userFindByUsername(@Body() UserFindDto: UserFindDto) {
    return this.usersService.findByLikeUsername(UserFindDto.username);
  }
}
