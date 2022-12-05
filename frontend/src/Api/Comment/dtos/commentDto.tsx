import { UserDto } from "../../User/UserDtos/userDto";

export interface CommentDto {
  _id?: string;
  author: UserDto;
  parentId?: string;
  comment: string;
}
