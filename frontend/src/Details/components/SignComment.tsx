import React from "react";
import { PrettySave, PrettySend } from "../../components/PrettyButtons";

const SignComment = () => {
  return (
    <div className="flex flex-row space-x-2 pr-5">
      <a href="#_" className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[5rem] max-h-[5rem]">
        <img
          src={`https://avatars.githubusercontent.com/u/61701011?s=96&v=4`}
          alt=""
          className="rounded-full w-full h-full object-cover p-[0.2rem] min-w-[5rem]"
        />
      </a>
      <div className="w-full flex flex-col space-y-2">
        <textarea
          className="w-[100%] h-full  outline-none placeholder:items-center flex px-1 py-1 resize-none border-2 placeholder:font-normal placeholder:text-md rounded-sm"
          placeholder="Sıgn new comment"
        />
        <div className="h-full flex justify-end">
          <button>
            <PrettySend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignComment;
