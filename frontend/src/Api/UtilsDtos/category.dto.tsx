export interface CategoryDto {
  title: string;

  category_picture_file: {
    data: Buffer;
    contentType: string;
  };
}
