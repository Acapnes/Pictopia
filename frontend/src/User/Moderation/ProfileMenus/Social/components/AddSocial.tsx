import React, { useEffect, useState } from "react";
import { ModerationAPI } from "../../../../../Api/User/ModerationApi";
import { UserDto } from "../../../../../Api/User/UserDtos/userDto";
import { UserSocialsDto } from "../../../../../Api/User/UserDtos/userSocialsDto";
import {
  PrettyCheckIcon,
  PrettySmallArrowDown,
} from "../../../../../components/Prettys/PrettyIcons";

const AddSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  const [selectedSocial, setSelectedSocial] = useState<string>("Choose one");
  const [socialInputUrl, setSocialInputUrl] = useState<string>();
  const [userSocials, setUserSocials] = useState<UserSocialsDto>(
    user?.userSocials
  );
  const [inputPlaceHolder, setInputPlaceHolder] =
    useState<string>("Select a social...");

  const UpdateSocials = async () => {
    await ModerationAPI.setUserSocials(
      localStorage.getItem("access_token")!,
      userSocials!
    );
  };

  useEffect(() => {
    setUserSocials(user?.userSocials);
  }, []);

  return (
    <div className="w-full flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
      <button className="relative w-fit bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm outline-none group">
        <div className="w-full h-full flex flex-row items-center bg-soft-black px-4 py-1.5 rounded-sm">
          <p className="w-full h-full flex items-center text-gray-200 pr-1 font-semibold">
            {selectedSocial}
          </p>
          <PrettySmallArrowDown size={14} fill={"white"} />
        </div>
        <div className="w-full absolute top-11 left-0 items-start opacity-0 transition duration-100 group-focus:opacity-100">
          <div className="w-full flex flex-col space-y-1 text-gray-200 truncate bg-soft-black border-[1px]">
            {!user?.userSocials?.instagram &&
              selectedSocial !== "Instagram" && (
                <p
                  onClick={() => {
                    setSelectedSocial("Instagram");
                    setInputPlaceHolder("www.instagram.com/pictopia");
                  }}
                  className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
                >
                  Instagram
                </p>
              )}

            {!user?.userSocials?.github && selectedSocial !== "GitHub" && (
              <p
                onClick={() => {
                  setSelectedSocial("GitHub");
                  setInputPlaceHolder("www.github.com/pictopia");
                }}
                className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
              >
                Github
              </p>
            )}

            {!user?.userSocials?.linkedin && selectedSocial !== "LinkedIn" && (
              <p
                onClick={() => {
                  setSelectedSocial("LinkedIn");
                  setInputPlaceHolder("www.linkedin.com/in/pictopia");
                }}
                className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
              >
                LinkedIn
              </p>
            )}

            {!user?.userSocials?.discord && selectedSocial !== "Discord" && (
              <p
                onClick={() => {
                  setSelectedSocial("Discord");
                  setInputPlaceHolder("Pictopia#4321");
                }}
                className="hover:bg-pretty-pink bg-opacity-0 duration-200 hover:bg-opacity-70"
              >
                Discord
              </p>
            )}

            {!user?.userSocials?.steam && selectedSocial !== "Steam" && (
              <p
                onClick={() => {
                  setSelectedSocial("Steam");
                  setInputPlaceHolder("username like Pictopia");
                }}
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
          placeholder={inputPlaceHolder}
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
