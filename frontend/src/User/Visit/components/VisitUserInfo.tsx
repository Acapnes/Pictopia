import React from "react";
import { UserDto } from "../../../Api/User/UserDtos/userDto";

const VisitUserInfo: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex flex-col text-center">
      <p className="text-3xl font-bold text-gray-200">{user.name}</p>
      <p className="text-lg text-gray-200">{user.username}</p>
    </div>
  );
};

export default VisitUserInfo;
