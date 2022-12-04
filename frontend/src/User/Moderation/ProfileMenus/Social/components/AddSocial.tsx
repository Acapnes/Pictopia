import React, { useEffect, useState } from "react";
import { UserDto } from "../../../../../Api/User/UserDtos/userDto";
import { UserSocialsDto } from "../../../../../Api/User/UserDtos/userSocialsDto";
import {
  PrettyCheckIcon,
  PrettySmallArrowDown,
} from "../../../../../components/Prettys/PrettyIcons";

const AddSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  const [selectedSocial, setSelectedSocial] = useState<string>();
  const [socialInputUrl, setSocialInputUrl] = useState<string>();
  const [userSocials, setUserSocials] = useState<UserSocialsDto>();

  const UpdateSocials = async () => {};

  useEffect(() => {
    setUserSocials(user?.userSocials);
  }, []);

  return (
    <div className="w-full flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
      <button className="relative w-fit bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm outline-none group">
        <div className="w-full h-full flex flex-row items-center bg-soft-black px-4 py-1.5 rounded-sm">
          <p className="w-full h-full flex items-center text-gray-200 pr-1 font-semibold">
            Select Social
          </p>
          <PrettySmallArrowDown size={14} />
        </div>
        <div className="w-full absolute top-11 left-0 items-start p-0.5 bg-pretty-rough-pink rounded-sm opacity-0 transition duration-100 group-focus:opacity-100">
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
                onClick={() => setSelectedSocial("Steam")}
                className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
              >
                Steam
              </p>
            )}
          </div>
        </div>
      </button>
      <div className="flex-auto flex flex-row items-center space-x-2">
        <input
          onChange={(e) => setSocialInputUrl(e.target.value)}
          placeholder="www.pictopia.com"
          type="text"
          className="w-full h-fit outline-none px-2 py-1.5 bg-transparent border-[1px] border-pretty-rough-pink text-gray-200"
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
    </div>
  );
};

export default AddSocial;
