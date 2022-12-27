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

  async getPicturesByExplore(_id: mongoose.Types.ObjectId, picPaginationDto: PaginationDto): Promise<Pic[]> {
    return await this.userModel.findOne({ _id: _id }).then(async (user: UserDto) => {
      const filter = { $or: [] } as any;
      const allPictures = [];

        if (user.deepLearning.searched?.length > 0) {
          filter.$or.push({ hashTags: { $in: user.deepLearning.searched } });
          filter.$or.push({ title: { $in: user.deepLearning.searched } });
        }

        if (user.favCategories?.length > 0) {
          filter.$or.push({ categories: { $in: user.favCategories } });
        }

        if (user.savedPictures.length > 0) {
          const savedPictureTitles = await this.picModel
            .find({ _id: { $in: user.savedPictures }})
            .select('title');
          filter.$or.push({ title: { $in: savedPictureTitles.map(picture => picture.title) } });
        }

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
          .populate('categories').then(pictures => {
            allPictures.push(...pictures)
            if (pictures.length < 20) {
              return this.picModel
                .find({ _id: { $nin: allPictures.map(picture => picture._id)}})
                .limit(20 - pictures.length)
                .then(remainingPictures => {
                  return pictures.concat(remainingPictures);
                });
            }
            return pictures;
          });
      });
  }

  async picSearchByInput(picPaginationDto: PaginationDto): Promise<Pic[]> {
    if (picPaginationDto.input[0] === '#') {
      return this.picModel
        .find({ hashTags: picPaginationDto?.input })
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
          { title: picPaginationDto?.input },
          { description: picPaginationDto?.input },
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

  async picGetAlias(picture_id: string, picPaginationDto: PaginationDto): Promise<Pic[]> {
    return await this.picModel.findOne({ _id: picture_id }).then(async (picture: Pic) => {
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
