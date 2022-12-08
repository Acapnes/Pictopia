import { useState } from "react";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import {
  PrettyHelpIcon,
  PrettyLogOut,
  PrettyOptionsIcon,
  PrettyProfileIcon,
  PrettyWorldIcon,
} from "../../components/Prettys/PrettyIcons";

const HeaderOptions: React.FC<{}> = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-fit h-full items-center flex relative">
      <PrettyRainbow
        advChildStyle="px-0.5"
        onclick={() => setShowSettings(!showSettings)}
      >
        <PrettyOptionsIcon fill={"white"} size={18} />
      </PrettyRainbow>

      {showSettings && (
        <div className="absolute w-full flex items-start shadow-lg">
          <HeaderOptionsMenu />
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;

const HeaderOptionsMenu: React.FC<{}> = () => {
  return (
    <div
      className={`absolute top-[2.5rem] -right-5 lg:right-0 z-20 rounded-sm `}
    >
      <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden rounded-sm">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
        <span className="w-full relative bg-gray-900 rounded-sm duration-400">
          <div className="w-full flex flex-col overflow-auto scroll scrollbar-hide whitespace-nowrap ">
            <button className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30 border-b-[1px] border-opacity-75">
              <p className="my-2 text-gray-300 font-bold whitespace-nowarp">
                About Pictopia
              </p>
              <div>
                <PrettyWorldIcon />
              </div>
            </button>

            <button className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center  px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30 border-b-[1px] border-opacity-75">
              <p className="my-2 text-gray-300 font-bold whitespace-nowarp">
                Help
              </p>
              <div>
                <PrettyHelpIcon />
              </div>
            </button>
            <a
              href="/profile"
              className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30"
            >
              <p className="my-2 text-gray-300 font-bold">Profile</p>
              <div>
                <PrettyProfileIcon size={22} fill={"rgb(244,114,182)"} />
              </div>
            </a>
            <button
              onClick={() => {
                window.localStorage.removeItem("access_token");
                window.location.href = "/login";
              }}
              className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30"
            >
              <p className="my-2 text-gray-300 font-bold">Sign out</p>
              <div>
                <PrettyLogOut />
              </div>
            </button>
          </div>
        </span>
      </div>
    </div>
  );
};
