import { CategoryDto } from "../../Category/CategoryDtos/category.dto";

export interface UploadPicDto {
  title: string;

  picture: any;

  description: string;

  categories: CategoryDto[];

  hashTags: [string];
}
