import { PicDto } from "../../Pic/dtos/picDto";
import { UserDto } from "../../User/UserDtos/userDto";

export interface CommentDto {
  _id?: string;
  author: UserDto;
  destPicture: PicDto;
  parentId?: string;
  comment: string;
}