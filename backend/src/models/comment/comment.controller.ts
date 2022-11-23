import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
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

  @Get('/replyof/:_id')
  async getCommentsReply(@Param('_id') destPicture): Promise<Comment[]> {
    return this.commentsService.getCommentReplies(destPicture);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async commentCreate(@Request() req,@Body() commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    return this.commentsService.signComment(req.user,commentCreateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create/reply')
  async commentReplyCreate(@Request() req,@Body() commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    return this.commentsService.signReply(req.user,commentCreateDto);
  }
}
