import React from "react";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import {
  PrettySocialGitHubButton,
  PrettySocialInstagramButton,
  PrettySocialLinkedInButton,
} from "../../components/Prettys/PrettySocialButtons";

const UserSocialList: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="w-full flex flex-row justify-center items-center space-x-5">
      {user?.userSocials?.instagram && (
        <PrettySocialInstagramButton socialUrl={user?.userSocials?.instagram} />
      )}
      {user?.userSocials?.github && (
        <PrettySocialGitHubButton socialUrl={user?.userSocials?.github} />
      )}
      {user?.userSocials?.linkedin && (
        <PrettySocialLinkedInButton socialUrl={user?.userSocials?.linkedin} />
      )}
    </div>
  );
};

export default UserSocialList;
