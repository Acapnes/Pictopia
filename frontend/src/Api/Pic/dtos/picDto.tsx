import { CategoryDto } from "../../User/CategoryDtos/category.dto";
import { UserDto } from "../../User/UserDtos/userDto";

export interface PicDto {
  authorPic: UserDto;

  _id: string;

  title: string;

  description: string;

  creationDate: Date;

  picture_file: {
    data: Buffer;
    contentType: string;
  };

  categories: CategoryDto[];

  hashTags: string[];
}
