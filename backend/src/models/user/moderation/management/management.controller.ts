import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { ManagementGuard } from 'src/helpers/guards/management.guard';
import { ManagementService } from './management.service';

@UseGuards(AuthGuard('jwt'))
// @UseGuards(ManagementGuard)
@Controller('user/profile')
export class UserManagementController {
  constructor(private managementService: ManagementService) {}

  @Post('/update')
  async userProfileUpdate(
    @Request() req,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<ReturnFuncDto> {
    return this.managementService.updateProfile(req.user._id, userUpdateDto);
  }

  @UseGuards(ManagementGuard)
  @Post('/update/email')
  async userEmailUpdate(
    @Request() req,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<ReturnFuncDto> {
    return this.managementService.updateEmail(req.user._id, userUpdateDto);
  }

  @Post('/update/password')
  async userPasswordUpdate(
    @Request() req,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<ReturnFuncDto> {
    return this.managementService.updatePassword(req.user._id, userUpdateDto);
  }

  @Post('/update/settings')
  async userSettingsUpdate(@Request() req,@Body() userUpdateDto: UserUpdateDto): Promise<ReturnFuncDto> {
    return this.managementService.updateSettings(req.user._id, userUpdateDto);
  }

  @Post('/delete')
  async userDeletion(
    @Request() req,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<ReturnFuncDto> {
    return this.managementService.deleteUserAndConnections("634aca571b8e997cd895c3e7", userUpdateDto);
  }
}
