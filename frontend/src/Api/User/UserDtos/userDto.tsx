export interface UserDto {
  _id: string;

  name: string;

  email: string;

  username: string;

  avatar: {
    data: Buffer;
    contentType: string;
  };

  userSocials: {
    instagram?: string;

    github?: string;

    steam?: string;

    discord?: string;

    linkedin?: string;
  };

  savedPictures: string[];

  lastSearched: string[];

  birthDate: string;

  confrimed: boolean;

  bio: string;
}
