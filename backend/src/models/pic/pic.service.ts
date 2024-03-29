import mongoose, { Model } from 'mongoose';
import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicCreateDto } from 'src/dto/pic/pic.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';

@Injectable()
export class PicService {
  constructor(@InjectModel(Pic.name) private picModel: Model<PicDocument>) {}

  async findAll(): Promise<Pic[]> {
    return this.picModel
      .find({})
      .skip(Math.random() * 10)
      .limit(30)
      .populate('authorPic').populate('categories');
  }

  async getPicById(id: mongoose.Types.ObjectId): Promise<Pic> {
    return this.picModel.findOne({ _id: id }).populate('authorPic').populate('categories')
  }

  async getPicByStringId(id: string): Promise<Pic> {
    return this.picModel.findOne({ _id: id }).populate('authorPic').populate('categories');
  }

  async createPostWithImage(authorPicId: mongoose.Types.ObjectId | any,file: any, picCreateDto: PicCreateDto): Promise<ReturnFuncDto> {
    if (!picCreateDto.title) {
      return {
        success: false,
        message: 'Title cannot be empty',
      };
    }

    if (!file) {
      return {
        success: false,
        message: 'Picture cannot be empty',
      };
    }

    const newImage = await new this.picModel(picCreateDto);

    newImage.authorPic = authorPicId._id;
    newImage.picture_file.data = file.buffer;
    newImage.picture_file.contentType = file.mimetype;

    await newImage.save();

    return await this.getPicById(newImage._id).then((result:any) => {
      if (!result) {
        return {
          success: false,
          message: 'Something went wrong!',
        };
      }
      return {
        success: true,
        message: result._id.toString(),
      };
    });
  }
}
