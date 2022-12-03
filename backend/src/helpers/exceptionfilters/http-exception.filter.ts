import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {Request, Response} from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const status = exception.getStatus() as number;

    response.status(status).json({
      statusCode:status,
      message: exceptionResponse['message'],
      path: request.path
    })
  }
}
