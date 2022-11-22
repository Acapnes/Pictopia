import { UserDto } from "../../User/UserDtos/userDto";

export interface CommentDto {
  author: UserDto;
  comment: string;
}
