import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../Api/User/UserApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../../../components/Prettys/PrettyElements";
import {
  PrettyErrorIcon,
  PrettySignIcon,
} from "../../../components/Prettys/PrettyIcons";

const SearchUsers: React.FC<{
  searchInput: string;
  size: number;
}> = ({ searchInput, size }) => {
  const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    (async () => {
      if (searchInput)
        setSearchedUsers(await UserAPI.findUserByUsername(searchInput));
    })();
  }, [searchInput]);

  return (
    <>
      {searchInput && (
        <div className="w-full flex justify-center">
          {searchedUsers?.length > 0 ? (
            <div className="max-h-[20rem] w-full flex flex-col space-y-2.5 overflow-x-hidden scrollbar-hide">
              {searchedUsers?.map((user: UserDto, userIndex: number) => (
                <a
                  href={`/user/${user.username}`}
                  className="flex flex-row space-x-3 items-center group bg-rough-soft-black bg-opacity-0 hover:bg-opacity-90 duration-300 rounded-l-full cursor-pointer"
                  key={userIndex}
                >
                  <PrettyCustomSizeAvatar
                    avatar={{
                      data: user?.avatar?.data,
                      contentType: user?.avatar?.contentType,
                    }}
                    size={3.75}
                  />
                  <div className="w-full flex items-center truncate">
                    <div className="w-full flex flex-row justify-between pr-4 items-center text-gray-200">
                      <div className="w-full flex flex-row space-x-2">
                        <p className="font-bold truncate">{user?.username}</p>
                        <p className="opacity-50 truncate">{user?.name}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 duration-200">
                        <PrettySignIcon size={22} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="w-full flex-auto flex flex-row space-x-1.5 items-center justify-center py-3 rounded-sm">
              <PrettyErrorIcon size={16} fill={"white"} />
              <span className="text-gray-200 font-semibold">No User Found</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchUsers;
