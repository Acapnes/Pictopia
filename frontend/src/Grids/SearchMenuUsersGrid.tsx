import { useEffect, useState } from "react";
import { UserAPI } from "../Api/UserApi";
import { UserDto } from "../Api/UserDtos/userDto";
import { PrettyProfileIcon, PrettySignIcon } from "../components/PrettyIcons";

const SearchMenuUsersGrid = () => {
  const [fetchedUsers, setFetchedUsers] = useState<UserDto[]>([]);

  const fetchAndSetPics = async () => {
    setFetchedUsers(await UserAPI.getAllUsers());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-4 py-4 px-1 w-full  ">
        {fetchedUsers?.map((user, userIndex) => (
          <div
            className="flex flex-row items-center -space-x-10 group"
            key={userIndex}
          >
            {user?.avatar?.contentType && user?.avatar?.data ? (
              <a
                href="#_"
                className="z-10 flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[5rem] h-[4.5rem] relative"
              >
                <img
                  src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.data}`}
                  alt=""
                  className="rounded-full w-full h-full object-cover p-[0.18rem]"
                />
              </a>
            ) : (
              <a
                href="#_"
                className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[5rem] h-[4.5rem] relative p-[0.18rem]"
              >
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
                  <PrettyProfileIcon size={32} fill={"white"} />
                </div>
              </a>
            )}

            <a href="#_" className="w-full flex items-center truncate">
              <div className="w-full flex flex-row justify-between items-center h-fit pl-12 pr-4 py-2 bg-soft-black rounded-md text-gray-200">
                <div className="w-full">
                  <p className="font-bold">{user?.name}</p>
                  <p className="font-light truncate">{user?.username}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 duration-200">
                  <PrettySignIcon size={22}/>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMenuUsersGrid;
