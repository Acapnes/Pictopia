import React from "react";
import { PrettyCompassIcon } from "../../components/Prettys/PrettyIcons";

const CurrentCategory = () => {
  return (
    <a
      href="/explore"
      className="relative min-w-[25vw] 2xl:min-w-[15vw] text-start font-semibold text-white rounded-sm h-[4rem]"
    >
      <img
        src="/explore.jpg"
        className=" object-none h-full w-full bg-opacity-70 rounded-sm border-2"
        alt=""
      />
      <div className="absolute top-0 w-full h-full text-start flex flex-row space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
        <div>
          <PrettyCompassIcon />
        </div>
        <p className="my-2 text-gray-300 font-bold text-2xl">Explore</p>
      </div>
    </a>
  );
};

export default CurrentCategory;
