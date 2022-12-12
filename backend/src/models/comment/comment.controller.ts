import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentManagementService } from './comment.management.service';
import { CommentService } from './comment.service';

@Controller('/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentManagementService: CommentManagementService
  ) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':_id')
  async getCommentsById(@Param('_id') _id): Promise<Comment[]> {
    return this.commentService.findCommentByMongooseId(_id);
  }

  @Get('/replyof/:_id')
  async getCommentsReply(@Param('_id') destComment): Promise<Comment[]> {
    return this.commentService.getCommentReplies(destComment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async commentCreate(
    @Request() req,
    @Body() commentCreateDto: CommentCreateDto
  ): Promise<ReturnFuncDto> {
    return this.commentService.signComment(req.user, commentCreateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create/reply')
  async commentReplyCreate(
    @Request() req,
    @Body() commentCreateDto: CommentCreateDto
  ): Promise<ReturnFuncDto> {
    return this.commentService.signReply(req.user, commentCreateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/delete')
  async commentDelete(@Body() commentDto: CommentDto): Promise<ReturnFuncDto> {
    return this.commentManagementService.deteleCommentById(commentDto._id);
  }
}
