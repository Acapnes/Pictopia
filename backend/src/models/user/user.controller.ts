import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user/user.dto';
import { ValidationUserDto } from 'src/dto/user/validation.user.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/get')
  async getUserByEmail(@Body() validationUserDto: ValidationUserDto): Promise<User> {
    return this.usersService.findByEmail(validationUserDto);
  }

  @Post('/signup')
  async userRegister(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Post('/signin')
  async userLogin(@Body() validationUserDto: ValidationUserDto){
    return this.usersService.validateUser(validationUserDto);
  }
}
