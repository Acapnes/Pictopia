import { UserDto } from "../../User/UserDtos/userDto";

export interface PicDto {
  authorPic: UserDto;

  _id: string;
  title: string;
  description: string;
  picture_file: {
    data: Buffer;
    contentType: string;
  };
  
}
