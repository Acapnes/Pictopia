import { useEffect, useState } from "react";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../components/Prettys/PrettyComponents";
import {
  PrettyPictopia,
  PrettyUploadIcon,
} from "../components/Prettys/PrettyIcons";
import SearchBar from "./Search/SearchBar";
import HeaderOptions from "./Options/HeaderOptions";
import HeaderAccount from "./Account/HeaderAccount";
import { Outlet } from "react-router-dom";

const Header: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
  };
  useEffect(() => {
    initFetchCredentials();
  }, []);

  return (
    <div className="w-full z-10 sticky top-0 text-sm">
      <div className="">
        <div className="w-full h-header_height flex flex-row justify-between space-x-3 bg-soft-black bg-opacity-95 px-3 py-2 border-b-[2px] border-light-soft-black">
          <a
            href="/explore"
            className="h-full flex items-center w-fit rounded-md"
          >
            <PrettyPictopia />
          </a>
          <SearchBar />
          <div className="flex flex-row space-x-3 ">
            <PrettyHeaderUploadPicture />
            <HeaderAccount user={userCredentials} />
            <HeaderOptions />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;

const PrettyHeaderUploadPicture = () => {
  return (
    <a href="/upload" className="h-full flex items-center">
      <PrettyRainbow onclick={() => (window.location.href = "/upload")}>
        <div className="flex flex-row">
          <span className="text-white hidden lg:block pr-1.5">Upload</span>
          <div className="flex items-end">
            <PrettyUploadIcon />
          </div>
        </div>
      </PrettyRainbow>
    </a>
  );
};
