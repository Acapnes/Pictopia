import React, { useEffect, useState } from "react";
import { UserDto } from "../../../../../Api/User/UserDtos/userDto";
import { UserSocialsDto } from "../../../../../Api/User/UserDtos/userSocialsDto";
import {
  PrettyCheckIcon,
  PrettySmallArrowDown,
  PrettySquareAddIcon,
} from "../../../../../components/Prettys/PrettyIcons";
import UserSocialList from "../../../../components/UserSocialList";

const Socials: React.FC<{ user: UserDto }> = ({ user }) => {
  const [socialAddView, setSocialAddView] = useState(false);
  const [socialListView, setSocialListView] = useState(false);

  const [selectedSocial, setSelectedSocial] = useState<string>();
  const [socialInputUrl, setSocialInputUrl] = useState<string>();
  const [userSocials, setUserSocials] = useState<UserSocialsDto>();

  const UpdateSocials = async () => {};
  console.log(user?.userSocials["discord"]);

  useEffect(() => {
    setUserSocials(user?.userSocials);
  }, []);

  return (
    <div className="flex flex-col space-y-5">
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
        <div className="w-full flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
          <button
            onClick={() => setSocialListView(!socialListView)}
            className="relative w-fit bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm outline-none"
          >
            <div className="w-full h-full flex flex-row items-center bg-soft-black px-6 py-2 rounded-sm">
              <p className="w-full h-full flex items-center text-gray-200 pr-1 font-semibold">
                Select Social
              </p>
              <PrettySmallArrowDown size={14} />
            </div>
            {socialListView && (
              <div className="w-full absolute top-12 left-0 items-start p-[0.15rem] bg-pretty-rough-pink rounded-sm">
                <div className="w-full flex flex-col space-y-1 text-gray-200 truncate bg-soft-black">
                  <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                    Choose one
                  </p>
                  {!user?.userSocials?.instagram && (
                    <p
                      onClick={() => setSelectedSocial("Instagram")}
                      className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
                    >
                      Instagram
                    </p>
                  )}

                  {!user?.userSocials?.github && (
                    <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                      Github
                    </p>
                  )}

                  {!user?.userSocials?.linkedin && (
                    <p className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70">
                      LinkedIn
                    </p>
                  )}

                  {!user?.userSocials?.discord && (
                    <p
                      onClick={() => setSelectedSocial("Discord")}
                      className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
                    >
                      Discord
                    </p>
                  )}

                  {!user?.userSocials?.steam && (
                    <p
                      onClick={() => setSelectedSocial("Discord")}
                      className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
                    >
                      Steam
                    </p>
                  )}
                </div>
              </div>
            )}
          </button>
          {selectedSocial && (
            <div className="w-fit h-fit flex items-center bg-gray-800 rounded-sm px-4 py-2.5 select-none">
              <p className="text-gray-200 font-semibold text-center">
                {selectedSocial}
              </p>
            </div>
          )}
          {selectedSocial && (
            <div className="flex flex-row space-x-2">
              <input
                onChange={(e) => setSocialInputUrl(e.target.value)}
                placeholder="www.pictopia.com"
                type="text"
                className="w-fit h-fit outline-none px-2 py-2.5 bg-transparent border-[1px] border-pretty-rough-pink text-gray-200"
              />
              {socialInputUrl && (
                <div className="flex items-center">
                  <button
                    onClick={() => UpdateSocials()}
                    className="w-fit h-fit bg-pretty-pink p-1 rounded-sm"
                  >
                    <PrettyCheckIcon fill={"black"} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <UserSocialList user={user} />
    </div>
  );
};

export default Socials;
