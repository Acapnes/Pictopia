import { UserDto } from "../../User/UserDtos/userDto";

export interface CommentDto {
  author: UserDto;
  parentId?: string;
  comment: string;
}
