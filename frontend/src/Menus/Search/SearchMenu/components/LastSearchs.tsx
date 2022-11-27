import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../../Api/User/UserApi";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";

const LastSearchs: React.FC<{}> = () => {
  const [lastSearches, setLastSearches] = useState<UserDto["lastSearched"]>([]);

  const getLastSearches = async () => {
    if (window.localStorage.getItem("access_token")) {
      setLastSearches(
        await UserAPI.GetUsersLastSearchedList(
          window.localStorage.getItem("access_token")!
        )
      );
    }
  };

  useEffect(() => {
    getLastSearches();
  }, []);

  return (
    <>
      {lastSearches.length > 0 && (
        <div className="w-full flex flex-row items-center space-x-2 h-[4rem] border-b-2 border-pretty-pink ">
          {lastSearches.map((search, searchIndex) => (
            <div key={searchIndex} className="">
              <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
                <div className="px-2.5 py-1">
                  <span>{search}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LastSearchs;
