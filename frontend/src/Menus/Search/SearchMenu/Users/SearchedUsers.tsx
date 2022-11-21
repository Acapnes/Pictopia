import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import {
  PrettyProfileIcon,
  PrettySignIcon,
} from "../../../../components/Prettys/PrettyIcons";

const SearchMenuUsersGrid: React.FC<{ searchedUsers: UserDto[] }> = ({
  searchedUsers,
}) => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-1 gap-4 py-4 px-1 w-full">
        {searchedUsers?.map((user: UserDto, userIndex: number) => (
          <a
            href={`/user/${user.username}`}
            className="flex flex-row space-x-3 items-center group bg-soft-black bg-opacity-0 hover:bg-opacity-90 duration-300 rounded-l-full cursor-pointer"
            key={userIndex}
          >
            {user?.avatar?.contentType && user?.avatar?.data ? (
              <div className="z-10 flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[5rem] h-[5rem] relative">
                <img
                  src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.data}`}
                  alt=""
                  className="rounded-full w-full h-full object-cover p-[0.18rem]"
                />
              </div>
            ) : (
              <a
                href="#_"
                className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[5rem] h-[5rem] relative p-[0.18rem]"
              >
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
                  <PrettyProfileIcon size={32} fill={"white"} />
                </div>
              </a>
            )}

            <div className="w-full flex items-center truncate">
              <div className="w-full flex flex-row justify-between pr-4 items-center text-gray-200">
                <div className="w-full flex flex-row space-x-2 ">
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
  );
};

export default SearchMenuUsersGrid;
