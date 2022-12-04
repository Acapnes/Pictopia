import React from "react";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyButtons";

const Blocking: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
      <div className="flex flex-col space-y-10 py-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-3 px-5 text-gray-200">
          <div className="flex flex-col space-y-2">
            <p className="text-2xl font-bold">Blocking</p>
            <p>
              Blocking a user prevents that user from messaging you and
              commenting on your projects and discussion posts. Note that it
              does not remove the user's artwork from the main walls of art
              (Trending/Latest/etc.). The purpose of this feature is to prevent
              users from harassing you on Pictopia.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="font-bold">
              Search for a user’s name you wish to block
            </p>
            <div className="flex flex-row space-x-2">
              <input
                type="text"
                name=""
                id=""
                className="w-full bg-transparent border-[1.5px] border-pretty-rough-pink text-gray-200 outline-none px-2 py-1.5 rounded-sm"
              />
              <PrettyRainbow
                advStyle="px-1 rounded-sm"
                advChildStyle="rounded-sm"
              >
                <p>Block</p>
              </PrettyRainbow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocking;
