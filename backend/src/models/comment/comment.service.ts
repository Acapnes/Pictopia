import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find({});
  }

  async findCommentByMongooseId(_id:mongoose.Types.ObjectId): Promise<Comment[]> {
    return this.commentModel.find({destPicture: _id}).populate('author');
  }

  async signComment(commentDto: CommentDto): Promise<Comment> {
    return this.commentModel.create(commentDto);
  }
}
