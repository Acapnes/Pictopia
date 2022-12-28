export interface UserDto {
  _id: string;

  name: string;

  email: string;

  password: string;

  username: string;

  avatar: {
    data: Buffer;
    contentType: string;
  };

  profile_background: {
    data: Buffer;
    contentType: string;
  };

  userSocials: userSocialsInterface[];

  savedPictures: string[];

  lastSearched: string[];

  birthDate: string;

  confrimed: boolean;

  bio: string;

  settings: {
    privateAccount: boolean;
    notification: boolean;
  };

  creationDate: Date;
}

interface userSocialsInterface {
  index?: number;
  platform?: string;
  url?: string;
}

export interface UserRegistrationDto {
  username: string;

  email: string;

  password: string;

  creationDate: Date | string;
}

export interface UserUpdateDto {
  email?: string;
  newEmail?: string;

  password?: string;
  newPassword?: string;

  name?: string;

  username?: string;

  bio?: string;
}

export interface UserValidationDto {
  email: string;

  password: string;
}
