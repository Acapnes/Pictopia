import React from "react";
import { PrettyBugIcon } from "../Prettys/PrettyIcons";

const Notfound: React.FC<{}> = () => {
  return (
    <div className="flex-auto flex-col h-full w-full items-center mt-20">
      <div className="w-full">
        <p className="text-[8rem] md:text-[10rem] 3xl:text-[12rem] text-gray-200 text-center">
          404
        </p>
      </div>
      <div className="w-full h-full flex flex-row space-x-5 items-center justify-center">
        <PrettyBugIcon size={40} fill={"#f472b6"} />
        <div className="flex flex-col text-center">
          <p className="text-xl md:text-2xl 3xl:text-3xl text-gray-200">
            Something went wrong
          </p>
          <p className="text-xl md:text-2xl 3xl:text-3xl text-gray-200">
            Please try again later
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
