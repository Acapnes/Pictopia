import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/schemas/user.schema';
import { UserService } from '../../user.service';

@Injectable()
export class UserModerationMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const userToken = this.jwtService.decode(req.headers['authorization'].slice(7,req.headers['authorization'].length,),)['_id'];
    this.userService.findByMongooseId(userToken).then(async (result) => {
      if (result) next();
      else {
        res.json({
          success: false,
          message: 'User cannot found',
        });
      }
    });
  }
}
