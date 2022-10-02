export interface PicDto {
  authorPic: {
    _id: string;
    username: string;
    avatar: string;
    __v: 0;
  };
  title: string;
  description: string;
  picture_file: {
    data: Buffer;
    contentType: string;
  };
}
