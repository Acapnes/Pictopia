import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { CategoryService } from '../category/category.service';
import { PaginationDto } from 'src/dto/pic/pagination.dto';

@Injectable()
export class PicFetchService {
  constructor(
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
    private categoryService: CategoryService
  ) {}

  async getPicturesByCategory(picPaginationDto: PaginationDto): Promise<Pic[]> {
    return await this.picModel
      .find({})
      .sort({ creationDate: -1 })
      .skip(Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage))
      .limit(picPaginationDto.postPerPage)
      .populate('authorPic')
      .populate('categories');
  }

  async picSearchByCategory(picPaginationDto: PaginationDto): Promise<Pic[]> {
    if (picPaginationDto.category === 'Explore' || picPaginationDto.category === '') {
      return await this.picModel
        .find({})
        .sort({ creationDate: -1 })
        .skip(Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage))
        .limit(picPaginationDto.postPerPage)
        .populate('authorPic')
        .populate('categories');
    }
    return await this.categoryService
      .getCategoryIdByTitle(picPaginationDto.category)
      .then((categoryId) => {
        return this.picModel
          .find({
            categories: { $in: categoryId },
          })
          .sort({ creationDate: -1 })
          .skip(Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage))
          .limit(picPaginationDto.postPerPage)
          .populate('authorPic')
          .populate('categories');
      });
  }

  async picSearchByInput(picPaginationDto: PaginationDto): Promise<Pic[]> {
    if (picPaginationDto.input[0] === '#') {
      return this.picModel
        .find({ hashTags: picPaginationDto?.input })
        .sort({ creationDate: -1 })
        .skip(Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage))
        .limit(picPaginationDto.postPerPage)
        .populate('authorPic')
        .populate('categories');
    }
    return this.picModel
      .find({
        $or: [
          { title: picPaginationDto?.input },
          { description: picPaginationDto?.input },
        ],
      })
      .sort({ creationDate: -1 })
      .skip(Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage))
      .limit(picPaginationDto.postPerPage)
      .populate('authorPic')
      .populate('categories');
  }
}
