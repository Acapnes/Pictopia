export interface PicDto {
  title: string;
  description: string;
  picture_file: {
    data: Buffer;
    contentType: string;
  };
}
