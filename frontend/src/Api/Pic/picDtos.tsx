import { CategoryDto } from "../User/Category/categoryDtos";
import { UserDto } from "../User/UserDtos/userDto";

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

export interface UploadPicDto {
  _id: string;

  title?: string;

  picture?: any;

  description?: string;

  creationDate?: Date;

  categories?: CategoryDto[] | string[] | any;

  hashTags?: string[];
}

export type PaginationDto = {
  category?: string;

  input?: string;

  currentPage: number;

  postPerPage: number;
};


