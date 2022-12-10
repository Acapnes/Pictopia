import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/models/user/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class PrivateGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body as any;
    return this.userService.findOneByUsername(body.username).then(async (authorUser: UserDto) => {
        if (authorUser.settings.privateAccount) {
          if (request.headers['authorization'] === undefined) throw new BadRequestException('Private Account');
          const visitorUserAccessToken = request.headers['authorization'].slice(7,request.headers['authorization'].length);
          const visitorUserId = this.jwtService.decode(visitorUserAccessToken)['_id'] as UserDto['_id'];
          return await this.userService.findByMongooseId(visitorUserId).then((visitorUser: UserDto) => {
              if (authorUser._id === visitorUser._id) {
                return true;
              } else throw new BadRequestException('Private Account');
            });
        }
        return true;
      });
  }
}
