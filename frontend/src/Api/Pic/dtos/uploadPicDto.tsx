import { CategoryDto } from "../../User/CategoryDtos/category.dto";

export interface UploadPicDto {
  _id: string;

  title?: string;

  picture?: any;

  description?: string;

  creationDate?: Date;

  categories?: CategoryDto[] | string[] | any;

  hashTags?: string[];
}
