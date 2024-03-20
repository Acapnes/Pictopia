import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { PicService } from '../pic/pic.service';
import { CommentController } from './comment.controller';
import { CommentManagementService } from './comment.management.service';
import { CommentService } from './comment.service';
import { PicSelectionMiddleware } from './middleware/pic.selection.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Pic.name, schema: PicSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentManagementService, PicService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PicSelectionMiddleware)
      .forRoutes({ path: '/comments/*', method: RequestMethod.POST });
  }
}
