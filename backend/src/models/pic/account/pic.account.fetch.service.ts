import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PaginationDto } from 'src/dto/pic/pagination.dto';
import { CategoryService } from 'src/models/category/category.service';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';
import { PicDto } from 'src/dto/pic/pic.dto';

@Injectable()
export class PicAccountFetchService {
  constructor(
    @InjectModel(Pic.name) private picModel: Model<PicDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private categoryService: CategoryService
  ) {}

  async getPicturesByExplore(
    _id: mongoose.Types.ObjectId,
    picPaginationDto: PaginationDto
  ): Promise<Pic[]> {
    return await this.userModel
      .findOne({ _id: _id })
      .then(async (user: UserDto) => {
        const filter =
          user.deepLearning.lastSearches?.length > 0 ||
          user.favCategories?.length > 0
            ? { $or: [] }
            : ({} as any);

        if (user.deepLearning.lastSearches?.length > 0) {
          filter.$or.push({
            hashTags: { $in: user.deepLearning.lastSearches },
          });
          filter.$or.push({ title: { $in: user.deepLearning.lastSearches } });
        }

        if (user.favCategories?.length > 0) {
          filter.$or.push({ categories: { $in: user.favCategories } });
        }

        // if (user.savedPictures.length > 0) {
        //   const savedPictureTitles = await this.picModel
        //     .find({ _id: { $in: user.savedPictures }})
        //     .select('title');
        //   filter.$or.push({ title: { $in: savedPictureTitles.map(picture => picture.title) } });
        // }

        return await this.picModel
          .find(filter)
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
    console.log("girdi")
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
          { title: { $regex: new RegExp(picPaginationDto?.input, 'i') } },
          { description: { $regex: new RegExp(picPaginationDto?.input, 'i') } },
        ],
      })
      .sort({ creationDate: -1 })
      .skip(
        Math.ceil(picPaginationDto.currentPage * picPaginationDto.postPerPage)
      )
      .limit(picPaginationDto.postPerPage)
      .populate('authorPic')
      .populate('categories');
  }
}
