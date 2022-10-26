import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { UserService } from '../user/user.service';
import { PicService } from '../pic/pic.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private picService: PicService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find({});
  }

  async findCommentByMongooseId(_id: mongoose.Types.ObjectId): Promise<Comment[]> {
    return (await this.commentModel.find({ destPicture: _id }).populate('author')).reverse();
  }

  async signComment(_id: mongoose.Types.ObjectId | any, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    if (!commentCreateDto.comment || !commentCreateDto.destPicture ){
      return {
        success: false,
        message: 'Comment or Destination Picture cannot be empty',
      };
    }

    return await this.picService.getPicById(commentCreateDto.destPicture)
      .then(async (resp) => {
        if (!resp) {
          return {
            success: false,
            message: 'Destination Picture cannot found.',
          };
        }

        const newComment = await this.commentModel.create({
          author: _id,
          destPicture: commentCreateDto.destPicture,
          comment: commentCreateDto.comment,
        });

        if (!this.findCommentByMongooseId(newComment._id)) {
          return {
            success: false,
            message: 'Something went wrong, could not add comment.',
          };
        }

        return {
          success: true,
          message: 'New comment has been added.',
        };
      });
  }
}
