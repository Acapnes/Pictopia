import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicSearchDto } from 'src/dto/pic/pic.search.dto';

@Injectable()
export class PicFetchService {
  constructor(@InjectModel(Pic.name) private picModel: Model<PicDocument>) {}

  async picPagination(picSearchDto: PicSearchDto): Promise<Pic[]> {
    if (picSearchDto.category && picSearchDto.input) {
      return (
        this.picModel
          .find({
            categories: { $in: picSearchDto.category },
            $or: [
              { title: picSearchDto?.input },
              { description: picSearchDto?.input },
            ],
          })
          .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
          // .skip(Math.ceil(Math.random() * 5))
          .limit(picSearchDto.postPerPage)
          .populate('authorPic')
          .populate('categories')
      );
    } else if (picSearchDto.category && !picSearchDto.input) {
      return this.picModel
        .find({
          categories: { $in: picSearchDto.category },
        })
        .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
        .skip(Math.ceil(Math.random() * 5))
        .limit(picSearchDto.postPerPage)
        .populate('authorPic')
        .populate('categories');
    } else if (!picSearchDto.category && picSearchDto?.input) {
      return (
        this.picModel
          .find({
            $or: [
              { title: picSearchDto?.input },
              { description: picSearchDto?.input },
            ],
          })
          .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
          // .skip(Math.ceil(Math.random() * 5))
          .limit(picSearchDto.postPerPage)
          .populate('authorPic')
          .populate('categories')
      );
    } else {
      return (
        this.picModel
          .find({})
          .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
          // .skip(Math.ceil(Math.random() * 5))
          .limit(picSearchDto.postPerPage)
          .populate('authorPic')
          .populate('categories')
      );
    }
  }

  async getPicturesByInput(picSearchDto: PicSearchDto): Promise<Pic[]> {
    let searchArray = [];
    if (picSearchDto.input[0] === '#') {
      return await this.picModel
        .find({ hashTags: picSearchDto.input })
        .populate('authorPic')
        .limit(30);
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
              searchArray.push(
                ...descriptionResult.filter((description) =>
                  searchArray.some(
                    (titleResult) => titleResult?._id === description?._id,
                  ),
                ),
              );
            });
          return searchArray;
        });
    }
  }
}
