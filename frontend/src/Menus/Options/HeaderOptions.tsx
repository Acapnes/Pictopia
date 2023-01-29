import { useState } from "react";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar, PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import {
  PrettyHelpIcon,
  PrettyLogOut,
  PrettyOptionsIcon,
  PrettyProfileIcon,
  PrettySignIcon,
  PrettyWorldIcon,
} from "../../components/Prettys/PrettyIcons";

const HeaderOptions: React.FC<{ user: UserDto }> = ({ user }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-fit h-full flex flex-col justify-end items-center relative group">
      <div className="flex items-center">
        {user ? (
          <a href={`/user/${user?.username}`}>
            <PrettyCustomSizeAvatar
              avatar={user?.avatar}
              size={2.5}
              bordered
            />
          </a>
        ) : (
          <PrettyRainbow
            advChildStyle="px-0.5 py-2.5 lg:px-0.5 lg:py-2.5 rounded-sm"
            advStyle="p-0.5 rounded-sm"
            onclick={() => setShowSettings(!showSettings)}
          >
            <PrettyOptionsIcon fill={"white"} size={16} />
          </PrettyRainbow>
        )}
      </div>
      <div className="absolute w-full">
        <HeaderOptionsMenu user={user} />
      </div>
    </div>
  );
};

export default HeaderOptions;

const HeaderOptionsMenu: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="absolute top-0 -right-0 lg:right-0 z-20 rounded-sm hidden group-hover:block hover:block pt-1">
      <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center  overflow-hidden rounded-sm bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
        <div className="w-full flex flex-col overflow-auto scroll space-y-3 scrollbar-hide whitespace-nowrap bg-rough-soft-black rounded-sm">
          <div className="flex flex-col">
            <button className="w-full h-full text-start flex flex-row justify-between space-x-5 items-center px-5 py-1.5 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
              <p className="my-2 text-gray-300 whitespace-nowarp">
                About Pictopia
              </p>
              <div>
                <PrettyWorldIcon />
              </div>
            </button>
            <button className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-5 py-1.5 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
              <p className="my-2 text-gray-300 whitespace-nowarp">Help</p>
              <PrettyHelpIcon />
            </button>
          </div>
          <hr className="border-pretty-pink border-opacity-75" />
          <HeaderUserOptions user={user} />
        </div>
      </div>
    </div>
  );
};

const HeaderUserOptions: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <>
      {user?.email ? (
        <>
          <a
            href="/profile"
            className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-5 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30"
          >
            <p className="my-2 text-gray-300">Profile</p>
            <div>
              <PrettyProfileIcon size={22} fill={"rgb(244,114,182)"} />
            </div>
          </a>
          <button
            onClick={() => {
              window.localStorage.removeItem("access_token");
              window.location.href = "/login";
            }}
            className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-5 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30"
          >
            <p className="my-2 text-gray-300 font-bold">Sign out</p>
            <div>
              <PrettyLogOut />
            </div>
          </button>
        </>
      ) : (
        <a
          href="/login"
          className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-5 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30"
        >
          <p className="my-2 text-gray-300 font-bold">SIGN IN</p>
          <div>
            <PrettySignIcon size={20} fill={"rgb(244,114,182)"} />
          </div>
        </a>
      )}
    </>
  );
};
