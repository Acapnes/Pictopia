import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Comment } from 'src/schemas/comment.schema';
import { PicService } from '../../pic/pic.service';

@Injectable()
export class PicSelectionMiddleware implements NestMiddleware {
  constructor(private picService: PicService) {}
  use(req: Request<Comment>, res: Response, next: NextFunction) {
    this.picService.getPicById(req.body.destPicture).then(async (result) => {
      if (result) next();
      else {
        next(new BadRequestException('Picture cannot found'))
      }
    });
  }
}
