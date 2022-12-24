import { useEffect, useState } from "react";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import {
  PrettyRainbow,
  PrettyRainbowLink,
} from "../components/Prettys/PrettyComponents";
import {
  PrettyPictopia,
  PrettySearchIcon,
  PrettySignIcon,
  PrettyUploadIcon,
} from "../components/Prettys/PrettyIcons";
import SearchBar from "./Search/SearchBar";
import HeaderOptions from "./Options/HeaderOptions";
import { Outlet } from "react-router-dom";
import { PrettyMediumAvatar } from "../components/Prettys/PrettyElements";

const Header: React.FC<{}> = () => {
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
      <div className="w-full h-header_height flex flex-row justify-between bg-soft-black bg-opacity-95 px-3 py-2 border-b-[2px] border-light-soft-black">
        <a
          href="/explore"
          className="h-full flex items-center w-fit rounded-md"
        >
          <PrettyPictopia />
        </a>
        <SearchBar user={userCredentials} />
        <div className="flex flex-row space-x-1.5 items-center">
          <HeaderSmallSearch />
          <PrettyHeaderUploadPicture />
          <HeaderAccount user={userCredentials} />
          <HeaderOptions user={userCredentials} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;

const PrettyHeaderUploadPicture = () => {
  return (
    <PrettyRainbowLink
      href={"/upload"}
      advChildStyle="px-1.5 py-2.5 lg:px-3 lg:py-2 rounded-sm"
      advStyle="p-0.5 rounded-sm"
    >
      <div className="flex flex-row">
        <span className="text-white hidden lg:block pr-1.5">Upload</span>
        <div className="flex items-end">
          <PrettyUploadIcon size={15} fill={"white"} />
        </div>
      </div>
    </PrettyRainbowLink>
  );
};

const HeaderAccount: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex items-center">
      {user?.email ? (
        <PrettyMediumAvatar user={user} rounded={true} />
      ) : (
        <PrettyRainbowLink
          href={"/login"}
          advChildStyle="px-1.5 py-2.5 lg:px-3 lg:py-2 rounded-sm"
          advStyle="p-0.5 rounded-sm"
        >
          <div className="flex flex-row">
            <span className="text-white hidden xs:block pr-1.5 whitespace-nowrap">
              SIGN IN
            </span>
            <div className="flex items-end">
              <PrettySignIcon size={18} fill={"white"} />
            </div>
          </div>
        </PrettyRainbowLink>
      )}
    </div>
  );
};

const HeaderSmallSearch: React.FC<{}> = () => {
  return (
    <div className="h-full flex items-center w-fit md:hidden">
      <PrettyRainbowLink
        href={"/search"}
        advChildStyle="px-1.5 py-2.5 lg:px-3 lg:py-2 rounded-sm"
        advStyle="p-0.5 rounded-sm"
      >
        <PrettySearchIcon fill={"white"} size={15} />
      </PrettyRainbowLink>
    </div>
  );
};
