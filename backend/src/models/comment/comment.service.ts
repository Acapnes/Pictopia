import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { PicService } from '../pic/pic.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private picService: PicService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find({}).populate('author');
  }

  async findCommentByMongooseId(
    destPicture: mongoose.Types.ObjectId,
  ): Promise<Comment[]> {
    return (
      await this.commentModel
        .find({ destPicture: destPicture, parentId: { $exists: false } })
        .populate('author')
    ).reverse();
  }

  async getCommentReplies(_id: mongoose.Types.ObjectId): Promise<Comment[]> {
    return (
      await this.commentModel.find({ parentId: _id }).populate('author')
    ).reverse();
  }

  async signComment(_id: mongoose.Types.ObjectId | any, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
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
          creationDate: commentCreateDto.creationDate
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

  async signReply(
    _id: mongoose.Types.ObjectId,
    commentCreateDto: CommentCreateDto,
  ): Promise<ReturnFuncDto> {
    if (
      !commentCreateDto.comment ||
      !commentCreateDto.destPicture ||
      !commentCreateDto.parentId
    ) {
      return {
        success: false,
        message: 'Comment, Destination Picture, Comment Id cannot be empty',
      };
    }

    return await this.picService
      .getPicById(commentCreateDto.destPicture)
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
          parentId: commentCreateDto.parentId,
          comment: commentCreateDto.comment,
          creationDate: commentCreateDto.creationDate,
        });

        if (!this.findCommentByMongooseId(newComment._id)) {
          return {
            success: false,
            message: 'Something went wrong, could not add reply.',
          };
        }

        return {
          success: true,
          message: 'New reply has been added.',
        };
      });
  }
}
