import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PicFetchService {
  constructor(
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
    private categoryService: CategoryService,
  ) {}

  async getPicturesByCategory(picSearchDto: PicSearchDto): Promise<Pic[]> {
    return await this.picModel
      .find({})
      .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
      // .skip(random)
      .limit(picSearchDto.postPerPage)
      .populate('authorPic')
      .populate('categories');
  }

  async picSearchByCategory(picSearchDto: PicSearchDto): Promise<Pic[]> {
    if (picSearchDto.category === 'Explore' || picSearchDto.category === '') {
      return await this.picModel
        .find({})
        .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
        // .skip(Math.ceil(Math.random() * 5))
        .limit(picSearchDto.postPerPage)
        .populate('authorPic')
        .populate('categories');
    }
    return await this.categoryService
      .getCategoryIdByTitle(picSearchDto.category)
      .then((categoryId) => {
        return (
          this.picModel
            .find({
              categories: { $in: categoryId },
            })
            .skip(
              Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage),
            )
            // .skip(Math.ceil(Math.random() * 5))
            .limit(picSearchDto.postPerPage)
            .populate('authorPic')
            .populate('categories')
        );
      });
  }

  async picSearchByInput(picSearchDto: PicSearchDto): Promise<Pic[]> {
    if (picSearchDto.input[0] === '#') {
      return (
        this.picModel
          .find({ hashTags: picSearchDto?.input })
          .skip(Math.ceil(picSearchDto.currentPage * picSearchDto.postPerPage))
          // .skip(Math.ceil(Math.random() * 5))
          .limit(picSearchDto.postPerPage)
          .populate('authorPic')
          .populate('categories')
      );
    }
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
  }
}
