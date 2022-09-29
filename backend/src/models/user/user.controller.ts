import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "src/dto/user/user.dto";
import { User } from "src/schemas/user.schema";
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/create')
  async userRegister(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }
}
