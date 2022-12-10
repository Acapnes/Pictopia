import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/models/user/auth/auth.service';
import { Observable } from 'rxjs';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';

@Injectable()
export class ManagementGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.body as unknown as UserUpdateDto;
    return this.authService.validateUserEmailPassword({ email: user.email, password: user.password }).then(async (valideResult) => {
        if (valideResult.success) return true;
        throw new UnauthorizedException;
      });
  }
}
