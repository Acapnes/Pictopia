import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';

@Controller('/comments')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Get()
  async getComments(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Post('/create')
  async commentCreate(@Body() commentDto: CommentDto): Promise<Comment> {
    return this.commentsService.signComment(commentDto);
  }
}
