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

  async getPicturesByExplore(picPaginationDto: PaginationDto): Promise<Pic[]> {
    return await this.picModel
      .find({})
      .sort({ creationDate: -1 })
      .skip(
        Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage)
      )
      .limit(picPaginationDto.postPerPage)
      .populate('authorPic')
      .populate('categories');
  }

  async picSearchByCategory(picPaginationDto: PaginationDto): Promise<Pic[]> {
    return await this.categoryService
      .getCategoryIdByTitle(picPaginationDto.category)
      .then((categoryId) => {
        return this.picModel
          .find({
            categories: { $in: categoryId },
          })
          .sort({ creationDate: -1 })
          .skip(
            Math.ceil(
              picPaginationDto.currentPage * picPaginationDto.postPerPage
            )
          )
          .limit(picPaginationDto.postPerPage)
          .populate('authorPic')
          .populate('categories');
      });
  }

  async picSearchByInput(picPaginationDto: PaginationDto): Promise<Pic[]> {
    if (picPaginationDto.input[0] === '#') {
      return this.picModel
        .find({
          hashTags: { $regex: new RegExp(picPaginationDto?.input, 'i') },
        })
        .sort({ creationDate: -1 })
        .skip(
          Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage)
        )
        .limit(picPaginationDto.postPerPage)
        .populate('authorPic')
        .populate('categories');
    }
    return this.picModel
      .find({
        $or: [
          {
            title: {
              $regex: new RegExp(picPaginationDto?.input, 'i'),
            },
          },
          {
            description: {
              $regex: new RegExp(picPaginationDto?.input, 'i'),
            },
          },
        ],
      })
      .sort({ creationDate: -1 })

      .populate('authorPic')
      .populate('categories');
  }

  async picGetAlias(
    picture_id: string,
    picPaginationDto: PaginationDto
  ): Promise<Pic[]> {
    return await this.picModel
      .findOne({ _id: picture_id })
      .then(async (picture: Pic) => {
        return await this.picModel
          .find({
            $and: [
              { _id: { $ne: picture._id } },
              {
                $or: [
                  { title: { $eq: picture.title } },
                  // { description:  { $eq: picture.description } },
                  // { authorPic: { $eq: picture.authorPic } },
                  { categories: { $in: picture.categories } },
                  { hashTags: { $in: picture.hashTags } },
                ],
              },
            ],
          })
          .sort({ creationDate: -1 })
          .skip(
            Math.ceil(
              picPaginationDto.currentPage * picPaginationDto.postPerPage
            )
          )
          .limit(picPaginationDto.postPerPage)
          .populate('authorPic')
          .populate('categories');
      });
  }
}
