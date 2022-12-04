import React from "react";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import {
  PrettyProfileCopyButton,
  PrettyShareProfileButton,
} from "./PrettySocialButtons";
import VisitUserSocials from "./VisitUserSocials";

const VisitUserInfo: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <p className="text-3xl font-bold text-gray-200">{user.name}</p>
      <p className="text-lg text-gray-200">{user.username}</p>
      <div className="w-fit flex flex-row justify-center items-center space-x-5">
        <VisitUserSocials user={user} />
        <PrettyProfileCopyButton />
        <PrettyShareProfileButton />
      </div>
    </div>
  );
};

export default VisitUserInfo;
