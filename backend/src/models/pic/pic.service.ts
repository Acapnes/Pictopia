import mongoose, { Model } from 'mongoose';
import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicCreateDto } from 'src/dto/pic/pic.create.dto';

@Injectable()
export class PicService {
  constructor(@InjectModel(Pic.name) private picModel: Model<PicDocument>) {}

  async findAll(): Promise<Pic[]> {
    return this.picModel.find({}).skip(Math.random()*10).limit(30).populate("authorPic")
  }

  async findAllActionless(): Promise<Pic[]> {
    return this.picModel.find({}).limit(20).skip(Math.random()*4)
  }


  async getPicById(id: any): Promise<Pic> {
    return this.picModel.findOne({ _id: id }).populate("authorPic");
  }

  async createPostWithImage(file, picCreateDto: PicCreateDto) {
    const newImage = await new this.picModel(picCreateDto);
    newImage.picture_file.data = file.buffer;
    newImage.picture_file.contentType = file.mimetype;

    return newImage.save();
  }
}
