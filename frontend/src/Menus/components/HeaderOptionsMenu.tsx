import React from "react";
import {
  PrettyHelpIcon,
  PrettyLogOut,
  PrettyProfileIcon,
  PrettyWorldIcon,
} from "../../components/PrettyIcons";

const HeaderOptionsMenu = () => {
  return (
    <div className="fixed top-[5.5rem] right-5 z-20 rounded-md">
      <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden rounded-md">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
        <span className="w-full relative bg-gray-900 rounded-md duration-400">
          <div className="flex flex-col w-[13.5rem]">
            <div className="w-full flex flex-col h-[32.5vh] space-y-3 overflow-auto scroll scrollbar-hide">
              <button className="relative w-full text-start font-semibold text-white rounded-md h-[4rem]">
                <div className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center  px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
                  <p className="my-2 text-gray-300 font-bold">About Pictopia</p>
                  <div>
                    <PrettyWorldIcon />
                  </div>
                </div>
                <div className="my-3 px-4">
                  <hr className="border-white" />
                </div>
                <div className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center  px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
                  <p className="my-2 text-gray-300 font-bold">Help</p>
                  <div>
                    <PrettyHelpIcon />
                  </div>
                </div>
                <div className="my-3 px-4">
                  <hr className="border-white" />
                </div>
                <div className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
                  <p className="my-2 text-gray-300 font-bold">Profile</p>
                  <div>
                    <PrettyProfileIcon />
                  </div>
                </div>
                <div className="w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-6 py-2 duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
                  <p className="my-2 text-gray-300 font-bold">Sign out</p>
                  <div>
                    <PrettyLogOut />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default HeaderOptionsMenu;
