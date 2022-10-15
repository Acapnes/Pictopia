import { UserDto } from "../UserDtos/userDto";

export interface CommentDto {
  author: UserDto;

  comment: string;
}
