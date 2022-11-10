export interface UserDto {
  _id: string;

  name: string;

  email: string;

  username: string;

  avatar: {
    data: Buffer;
    contentType: string;
  };

  birthDate: string;

  confrimed: boolean;

  bio: string;
}
