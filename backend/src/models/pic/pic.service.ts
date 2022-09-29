import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicDto } from 'src/dto/pic/pic.create.dto';
import { CommentDto } from 'src/dto/comment/comment.dto';

@Injectable()
export class PicService {
  constructor(@InjectModel(Pic.name) private picModel: Model<PicDocument>) {}

  async findAll(): Promise<Pic[]> {
    return this.picModel.find().exec();
  }

  async findOneCommentAndPopulate(_id: string): Promise<Pic> {
    return await this.picModel.findOne({ _id }).populate("comments.author");
  }

  async findByMongoId(picId: any): Promise<Pic> {
    return this.picModel.findOne({ _id: picId });
  }

  async create(picDto: PicDto): Promise<Pic> {
    return this.picModel.create(picDto);
  }

  async createComment(commentDto: CommentDto): Promise<Pic> {
    return this.picModel.findOneAndUpdate(
      { _id: commentDto.destPic },
      {
        $push: {
          comments: {
            author: new mongoose.Types.ObjectId(commentDto.author.toString()),
            comment: commentDto.comment,
            _id: new mongoose.Types.ObjectId(),
          },
        },
      },
    );
  }
}
