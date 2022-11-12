export interface CategoryDto {
  _id: string;

  title: string;

  category_picture_file: {
    data: Buffer;
    contentType: string;
  };
}
