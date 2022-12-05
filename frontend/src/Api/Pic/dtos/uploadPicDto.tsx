import { CategoryDto } from "../../User/CategoryDtos/category.dto";

export interface UploadPicDto {
  title: string;

  picture: any;

  description: string;

  categories: CategoryDto[];

  hashTags: [string];
}
