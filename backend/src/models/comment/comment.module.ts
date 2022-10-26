import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { PicService } from '../pic/pic.service';
import { UserService } from '../user/user.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Pic.name, schema: PicSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService,PicService],
})
export class CommentModule {}
