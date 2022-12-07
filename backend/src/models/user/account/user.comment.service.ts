import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user.service';
import { Pic } from 'src/schemas/pic.schema';
import { UserFindDto } from 'src/dto/user/user.find.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class UserCommentervice {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private userService: UserService
  ) {}

  async findUserGetComments(userFindDto: UserFindDto): Promise<Pic[] | any> {
    return this.userService
      .findOneByUsername(userFindDto.username)
      .then(async (user: UserDto) => {
        return (await this.commentModel.find({ author: user._id }).populate('destPicture').populate('author')).reverse();
      });
  }
}
