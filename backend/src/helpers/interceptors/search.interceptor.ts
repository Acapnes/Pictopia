import {
  CallHandler,
  NestInterceptor,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/models/user/user.service';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class SearchInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest().body as any;
        this.userService
          .decodeUserByToken(ctx.getRequest().headers['authorization'])
          .then(async (user: UserDto & User) => {
            await this.userModel.findOneAndUpdate(
              { _id: user?._id },
              {
                $addToSet: { 'deepLearning.lastSearches': req?.input },
              }
            );
            await this.userModel
              .findOne({ _id: user?._id })
              .then(async (findedUser: UserDto & User) => {
                if (findedUser?.deepLearning?.lastSearches.length >= 12) {
                  await this.userModel.findOneAndUpdate(
                    { _id: user?._id },
                    {
                      $pop: {
                        'deepLearning.lastSearches': -1,
                      },
                    }
                  );
                }
              });
          });
      })
    );
  }
}
