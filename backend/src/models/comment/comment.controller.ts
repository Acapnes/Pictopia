import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import mongoose from 'mongoose';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';

@Controller('/comments')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':_id')
  async getCommentsById(@Param('_id') _id): Promise<Comment[]> {
    return this.commentsService.findCommentByMongooseId(_id);
  }

  @Post('/create')
  async commentCreate(@Body() commentDto: CommentDto): Promise<Comment> {
    return this.commentsService.signComment(commentDto);
  }
}
