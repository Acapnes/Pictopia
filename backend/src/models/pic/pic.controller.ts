import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { PicDto } from 'src/dto/pic/pic.create.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicService } from './pic.service';

@Controller('/pics')
export class PicController {
  constructor(private readonly picsService: PicService) {}

  @Get()
  async getUsers(): Promise<Pic[]> {
    return this.picsService.findAll();
  }

  @Get('/comment/:_id')
  async getOnePopulatedComment(@Param('_id') _id: string): Promise<Pic> {
    return this.picsService.findOneCommentAndPopulate(_id);
  }

  @Post('/create')
  async userRegister(@Body() picDto: PicDto): Promise<Pic> {
    return this.picsService.create(picDto);
  }

  @Post('/comment/create')
  async commentCreate(@Body() commentDto: CommentDto): Promise<Pic> {
    return this.picsService.createComment(commentDto);
  }
}
