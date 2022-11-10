import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserValidationDto } from 'src/dto/user/user.validation.dto';
import { AuthService } from './auth.service';

@Controller('')
export class UserAuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async userRegister(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.createUser(userRegistrationDto);
  }

  @Post('/signin')
  async userLogin(@Body() userValidationdto: UserValidationDto) {
    return this.authService.validateLoginUser(userValidationdto);
  }
}
