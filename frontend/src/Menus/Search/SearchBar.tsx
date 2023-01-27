import React, { useEffect } from "react";
import { useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyElements";
import {
  PrettySearchIcon,
  PrettySignIcon,
} from "../../components/Prettys/PrettyIcons";

const SearchBar: React.FC<{ user: UserDto }> = ({ user }) => {
  const [searchInputvalue, setSearchInputvalue] = useState<string>();

  return (
    <div className="w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.05rem] rounded-sm flex flex-col justify-end relative group">
      <div className="w-full h-full flex flex-col justify-end relative group">
        <div className="w-full bg-rough-soft-black flex flex-row justify-between space-x-2 px-3 py-1.5 rounded-sm">
          <div className="h-full flex items-center mt-[0.25rem]">
            <PrettySearchIcon fill={"white"} />
          </div>
          <input
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                searchInputvalue?.length &&
                searchInputvalue?.length > 0
              ) {
                if (searchInputvalue[0] === "#") {
                  window.location.href = `/search/tags/${searchInputvalue.slice(
                    1,
                    searchInputvalue.length
                  )}`;
                } else {
                  window.location.href = `/search/${searchInputvalue}`;
                }
              }
            }}
            autoComplete="off"
            id="SearchInput"
            onChange={(e) => {
              setSearchInputvalue(e.target.value);
            }}
            type="text"
            placeholder="Search by type in pictures & hashtags & users..."
            className="outline-none bg-transparent text-gray-100 w-full placeholder:font-semibold"
          />
        </div>
        <div className="absolute w-full">
          <SearchUsers searchInput={searchInputvalue!} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

const SearchUsers: React.FC<{
  searchInput: string;
}> = ({ searchInput }) => {
  const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    (async () => {
      if (searchInput)
        setSearchedUsers(await UserAPI.findUserByUsername(searchInput));
    })();
  }, [searchInput]);

  return (
    <>
      {searchedUsers?.length > 0 && searchInput?.length > 0 && (
        <div className="w-full absolute top-1.5 z-20 rounded-sm">
          <div className="max-h-[12rem] w-full flex flex-col space-y-2.5 overflow-x-hidden scrollbar-hide bg-rough-soft-black rounded-sm px-2 py-1 pb-3">
            {searchedUsers?.map((user: UserDto, userIndex: number) => (
              <a
                href={`/user/${user.username}`}
                className="flex flex-row space-x-3 items-center group bg-extra-rough-soft-black bg-opacity-0 hover:bg-opacity-90 duration-300 rounded-l-full cursor-pointer"
                key={userIndex}
              >
                <PrettyCustomSizeAvatar
                  avatar={{
                    data: user?.avatar?.data,
                    contentType: user?.avatar?.contentType,
                  }}
                  size={3}
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
        </div>
      )}
    </>
  );
};
