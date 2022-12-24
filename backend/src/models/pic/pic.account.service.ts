import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { PicManageDto } from 'src/dto/pic/pic.manage.dto';
import { PicService } from './pic.service';

@Injectable()
export class PicAccountService {
  constructor(
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
    private picService: PicService
  ) {}

  async deleteAuthorsPicture(_id: mongoose.Types.ObjectId, picManageDto: PicManageDto): Promise<ReturnFuncDto> {
    return await this.picModel.findOneAndDelete({
        $and: [{ _id: picManageDto._id }, { authorPic: _id }],
      })
      .then(async (picture: any) => {
        if (await this.picService.getPicById(picture._id)) {
          return {
            success: false,
            message: 'Picture NOT deleted.',
          };
        }
        return {
          success: true,
          message: 'Picture has been deleted.',
        };
      });
  }

  async updateAuthorsPicture(_id: mongoose.Types.ObjectId, picManageDto: PicManageDto): Promise<ReturnFuncDto> {
    return await this.picModel.findOneAndUpdate(
        { $and: [{ _id: picManageDto?._id }, { authorPic: _id }]},
        {
          $set: {
            title: picManageDto?.title,
            description: picManageDto?.description,
            categories: picManageDto?.categories,
            hashTags: picManageDto?.hashTags,
          },
        }
      )
      .then(() => {
        return {
          success: false,
          message: 'Picture updated.',
        };
      });
  }
}
