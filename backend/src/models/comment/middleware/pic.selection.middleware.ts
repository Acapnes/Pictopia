import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';
import { PicService } from '../../pic/pic.service';

@Injectable()
export class PicSelectionMiddleware implements NestMiddleware {
  constructor(private picService: PicService) {}
  use(req: Request<Comment>, res: Response, next: NextFunction) {
    try {
      const converted = new mongoose.Types.ObjectId(req.body.destPicture);
      this.picService.getPicById(converted).then(async (result) => {
        if (result) next();
        else {
          next(new BadRequestException('Picture cannot found'));
        }
      });
    } catch (error) {
      next(new BadRequestException('Invalid picture id'));
    }
  }
}
