import React, { useState } from "react";
import { UserAPI } from "../../../../Api/User/UserApi";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyComponents";
import { PrettyCheckIcon } from "../../../../components/Prettys/PrettyIcons";
import { SearchMenuUsersGrid } from "../../../../Menus/Search/SearchBar";

const Blocking: React.FC<{ user: UserDto }> = ({ user }) => {
  const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);

  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm">
      <div className="flex flex-col space-y-10 py-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-3 px-5 text-gray-200">
          <div className="flex flex-col space-y-2">
            <p className="text-xl lg:text-2xl font-bold">Blocking</p>
            <p className="text-sm lg:text-md ">
              Blocking a user prevents that user from messaging you and
              commenting on your projects and discussion posts. Note that it
              does not remove the user's artwork from the main walls of art
              (Trending/Latest/etc.). The purpose of this feature is to prevent
              users from harassing you on Pictopia.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="font-bold text-xs md:text-md lg:text-lg">
              <span className="text-pretty-pink">* </span>
              Search for a user name you wish to block
            </p>
            <div className="flex flex-col space-y-2 items-end">
              <div className="w-full flex flex-row items-center space-x-1 pr-1.5 border-[1.5px] border-pretty-rough-pink">
                <input
                  onChange={async (e) => {
                    if (e.target.value.length > 0) {
                      setSearchedUsers(
                        await UserAPI.findUserByUsername(e.target.value)
                      );
                    }
                  }}
                  type="text"
                  className="w-full bg-transparent  text-gray-200 outline-none px-2 py-1.5 rounded-sm"
                />
                <button
                  onClick={() => {}}
                  className="h-fit p-0.5 rounded-sm bg-pretty-rough-pink"
                >
                  <PrettyCheckIcon size={18} />
                </button>
              </div>
              <div className="w-full">
                <SearchMenuUsersGrid searchedUsers={searchedUsers} size={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocking;
