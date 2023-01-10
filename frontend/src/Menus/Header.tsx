import { useEffect, useState } from "react";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { PrettyRainbowLink } from "../components/Prettys/PrettyComponents";
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
import { usePicturePaginationStore } from "../components/Zustand/store";

const Header: React.FC<{}> = () => {
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
  };
  useEffect(() => {
    initFetchCredentials();
  }, []);

  const setCurrentPage = usePicturePaginationStore(
    (state: any) => state.setCurrentPage
  );

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight) {
      setCurrentPage();
    }
  };

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="min-h-screen h-[0rem] max-h-full overflow-y-auto overflow-x-hidden bg-soft-black"
    >
      <div className="w-full z-10 sticky top-0 text-sm">
        <div className="bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] pb-0.5">
          <div className="w-full h-header_height flex flex-row justify-between bg-extra-rough-soft-black bg-opacity-95 px-3 py-2">
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
      <div className="flex flex-row items-center">
        <span className="text-white hidden md:block pr-1.5">Upload</span>
        <div className="flex items-end">
          <PrettyUploadIcon size={16} fill={"white"} />
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
          <div className="flex flex-row items-center">
            <span className="text-white hidden md:block pr-1.5 whitespace-nowrap">
              SIGN IN
            </span>
            <div className="flex items-end">
              <PrettySignIcon size={16} fill={"white"} />
            </div>
          </div>
        </PrettyRainbowLink>
      )}
    </div>
  );
};

const HeaderSmallSearch: React.FC<{}> = () => {
  return (
    <div className="h-full flex items-center w-fit lg:hidden">
      <PrettyRainbowLink
        href={"/search"}
        advChildStyle="px-1.5 py-2.5 md:px-3 md:py-3 rounded-sm"
        advStyle="p-0.5 rounded-sm"
      >
        <PrettySearchIcon fill={"white"} size={16} />
      </PrettyRainbowLink>
    </div>
  );
};
