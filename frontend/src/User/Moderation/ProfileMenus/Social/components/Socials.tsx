import React, { useState } from "react";
import {
  PrettySmallArrowDown,
  PrettySquareAddIcon,
} from "../../../../../components/Prettys/PrettyIcons";
import UserSocialList from "../../../../components/UserSocialList";

const Socials = (props: any) => {
  const [socialAddView, setSocialAddView] = useState(false);
  return (
    <div className="flex flex-col space-y-3">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-gray-200 font-bold text-2xl">Socials</p>
        <button
          onClick={() => setSocialAddView(!socialAddView)}
          className={`px-2 rounded-sm font-semibold ${
            socialAddView ? "bg-red-300" : "bg-pretty-yellow"
          }`}
        >
          <PrettySquareAddIcon
            fill={socialAddView ? "red" : "black"}
            state={socialAddView}
            size={28}
          />
        </button>
      </div>
      {socialAddView && (
        <div className="w-full flex flex-row justify-between">
          <button className="group relative w-fit bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
            <div className="w-full h-full flex flex-row items-center bg-soft-black px-6 py-1.5 rounded-sm">
              <p className="w-full h-full text-gray-200 pr-1 font-semibold">
                Select Social
              </p>
              <PrettySmallArrowDown size={14} />
            </div>

            <div className="w-full absolute hidden group-focus:block top-11 left-0 items-start p-[0.15rem] bg-pretty-rough-pink rounded-sm">
              <div className="w-full flex flex-col space-y-1 text-gray-200 truncate bg-soft-black">
                <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                  Choose one
                </p>
                {!props?.user?.userSocials?.instagram && (
                  <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                    Instagram
                  </p>
                )}

                {!props?.user?.userSocials?.github && (
                  <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                    Github
                  </p>
                )}

                {!props?.user?.userSocials?.linkedin && (
                  <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                    LinkedIn
                  </p>
                )}
              </div>
            </div>
          </button>
        </div>
      )}
      <UserSocialList user={props?.user} />
    </div>
  );
};

export default Socials;
