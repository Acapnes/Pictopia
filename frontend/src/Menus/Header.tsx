import { useEffect, useState } from "react";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { PrettyUploadPicture } from "../components/Prettys/PrettyButtons";
import { PrettyPictopia } from "../components/Prettys/PrettyIcons";
import SearchBar from "./Search/SearchBar";
import HeaderOptions from "./Options/HeaderOptions";
import HeaderAccount from "./Account/HeaderAccount";
import HeaderMobile from "./Mobile/HeaderMobile";

const Header = () => {
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
  };
  useEffect(() => {
    initFetchCredentials();
  }, []);

  return (
    <div className="w-full z-10 sticky top-0">
      <div className="hidden lg:block">
        <div className="w-full h-header_height flex flex-row  justify-between space-x-3 px-3 bg-soft-black bg-opacity-90 py-2">
          <a href="/" className="h-full flex items-center w-fit rounded-md">
            <PrettyPictopia />
          </a>
          <SearchBar />
          <div className="flex flex-row space-x-3">
            <a href="/upload">
              <PrettyUploadPicture />
            </a>
            <HeaderAccount userCredentials={userCredentials} />
          </div>
          <HeaderOptions />
        </div>
      </div>
      <div className="block lg:hidden">
        <HeaderMobile userCredentials={userCredentials} />
      </div>
    </div>
  );
};

export default Header;
