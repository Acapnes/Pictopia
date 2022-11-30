import {
  CallHandler,
  NestInterceptor,
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ExpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    console.log(ctx.getRequest().body)

    // throw new BadRequestException('exception');
    return next
      .handle()
      .pipe(tap(() => console.log('Interceptor')));
  }
}