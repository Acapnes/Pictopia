import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { PicService } from '../pic/pic.service';
import { CommentController } from './comment.controller';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Pic.name, schema: PicSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, PicService, CommentResolver],
})
export class CommentModule {}
