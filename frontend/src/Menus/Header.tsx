import { useEffect, useState } from "react";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { PrettyRainbowLink } from "../components/Prettys/PrettyComponents";
import {
  PrettyPictopia,
  PrettySignIcon,
  PrettyUploadIcon,
} from "../components/Prettys/PrettyIcons";
import HeaderOptions from "./Options/HeaderOptions";
import SearchBar from "./Search/SearchBar";

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
    <>
      <div className="w-full z-10 sticky top-0">
        <div className="w-full flex flex-row space-x-5 items-center justify-between bg-rough-soft-black bg-opacity-95 px-3 py-2.5 text-sm">
          <div className="flex flex-row space-x-1.5 items-center">
            <PrettyPictopia />
          </div>
          <div className="w-full flex items-center">
            <SearchBar user={userCredentials} />
          </div>
          <div className="flex flex-row space-x-1.5 items-center">
            <PrettyHeaderUploadPicture />
            <HeaderSignIn user={userCredentials} />
            <HeaderOptions user={userCredentials} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

const PrettyHeaderUploadPicture: React.FC<{}> = () => {
  return (
    <PrettyRainbowLink
      href="/upload"
      advChildStyle="px-2.5 py-1.5 rounded-sm"
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

const HeaderSignIn: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex items-center">
      {!user && (
        <PrettyRainbowLink
          href="/login"
          advChildStyle="px-2.5 py-1.5 rounded-sm"
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
