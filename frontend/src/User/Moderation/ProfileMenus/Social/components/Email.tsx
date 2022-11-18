import React, { useState } from "react";
import { UserDto } from "../../../../../Api/User/UserDtos/userDto";
import { PrettyCheckIcon } from "../../../../../components/Prettys/PrettyIcons";

const Email: React.FC<{ user: UserDto["email"] }> = ({ user }) => {
  const [inputEmail, setInputEmail] = useState<string>();
  return (
    <div className="flex flex-col space-y-3">
      <p className="text-gray-200 text-2xl font-bold">Email</p>
      <div className="flex flex-row space-x-2 justify-between items-center">
        <input
          type="email"
          placeholder={user}
          onChange={(e) => setInputEmail(e.target.value)}
          className="w-full bg-transparent text-gray-200 outline-none px-2 py-2 rounded-sm border-[1.5px] border-pretty-rough-pink
          border-opacity-50 duration-200 focus:border-opacity-100"
        />
        {inputEmail && (
          <button className="bg-pretty-pink p-1 rounded-sm">
            <PrettyCheckIcon fill={"black"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Email;
