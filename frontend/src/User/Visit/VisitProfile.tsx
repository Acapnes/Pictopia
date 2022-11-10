import React, { useEffect, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyProfileIcon } from "../../components/Prettys/PrettyIcons";

const VisitProfile = () => {
  const [userVisitCredentials, setUserVisitCredentials] =
    useState<UserDto>(Object);

  const setUserCredentials = async () => {
    const userUrlParam =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    setUserVisitCredentials(await UserAPI.VisitProfileFetchUser(userUrlParam));
  };
  useEffect(() => {
    setUserCredentials();
    console.log(userVisitCredentials);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-center">
        <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm w-[12rem] h-[12rem] relative p-[0.2rem]">
          <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-sm">
            <PrettyProfileIcon size={70} fill={"white"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitProfile;
