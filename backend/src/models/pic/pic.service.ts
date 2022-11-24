import mongoose, { Model } from 'mongoose';
import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicCreateDto } from 'src/dto/pic/pic.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { PicSearchDto } from 'src/dto/pic/pic.search.dto';

@Injectable()
export class PicService {
  constructor(@InjectModel(Pic.name) private picModel: Model<PicDocument>) {}

  async findAll(): Promise<Pic[]> {
    return this.picModel
      .find({})
      .skip(Math.random() * 10)
      .limit(30)
      .populate('authorPic');
  }

  async getPicById(id: any): Promise<Pic> {
    return this.picModel.findOne({ _id: id }).populate('authorPic');
  }

  async createPostWithImage(
    authorPicId: mongoose.Types.ObjectId | any,
    file: any,
    picCreateDto: PicCreateDto,
  ): Promise<ReturnFuncDto> {
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

    if (!(await this.getPicById(newImage._id))) {
      return {
        success: false,
        message: 'Something went wrong!',
      };
    }

    return {
      success: true,
      message: 'Picture has been created',
    };
  }

  async getPicturesByInput(picSearchDto: PicSearchDto): Promise<Pic[]> {
    let searchArray = [];
    if (picSearchDto.input[0] === '#') {
      return await this.picModel
        .find({ hashTags: picSearchDto.input })
        .populate('authorPic')
        .limit(30)
        .then((hashResult) => {
          searchArray.push([...hashResult]);
          return searchArray;
        });
    } else {
      return await this.picModel
        .find({ title: picSearchDto.input })
        // .populate('authorPic')
        .limit(5)
        .then(async (titleResult) => {
          searchArray.push(...titleResult);
          await this.picModel
            .find({ description: picSearchDto.input })
            // .populate('authorPic')
            .limit(5)
            .then(async (descriptionResult) => {
              searchArray.push(...descriptionResult.filter((description) => searchArray.some((titleResult) => titleResult?._id === description?._id)));
            });
          return searchArray;
        });
    }
  }
}
