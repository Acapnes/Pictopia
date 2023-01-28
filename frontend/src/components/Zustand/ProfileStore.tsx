import create from "zustand";
import { UserDto } from "../../Api/User/UserDtos/userDto";

interface ProfileState {
  profileSocials: UserDto["userSocials"];
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileSocials: [],

  setInitialProfileValues: (_socials: UserDto["userSocials"]) => {
    set(() => ({
      profileSocials: _socials,
    }));
  },

  setProfileSocials: (_socials: UserDto["userSocials"]) => {
    set(() => ({ profileSocials: _socials }));
  },
}));
