import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../Api/UserApi";
import { UserDto } from "../Api/UserDtos/userDto";
import Categories from "./components/Categories";
import {
  PrettyCategories,
  PrettyHeaderOptions,
  PrettyHeaderSignIn,
  PrettySearch,
  PrettyUploadPicture,
} from "../components/PrettyButtons";
import {
  PrettyPictopia,
  PrettyProfilePicture,
} from "../components/PrettyIcons";
import HeaderOptionsMenu from "./components/HeaderOptionsMenu";

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
  };
  useEffect(() => {
    initFetchCredentials();
  }, []);

  return (
    <div className="w-full z-10 space-y-3 sticky top-0">
      <div className="w-full h-[5.2rem] flex flex-row justify-between space-x-4 px-5 bg-soft-black bg-opacity-90 py-2">
        <div className="flex flex-row space-x-2">
          <Link
            to={"/"}
            className="h-full rounded-md my-[0.5rem] min-w-[10rem] hidden md:block"
          >
            <PrettyPictopia />
          </Link>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center"
          >
            <PrettyCategories showCategories={showCategories} />
          </button>
        </div>

        <div className="w-full hidden lg:flex lg:items-center ">
          <PrettySearch />
        </div>
        <div className="flex flex-row space-x-2">
          <a
            href="/upload"
            className="flex items-center"
          >
            <PrettyUploadPicture />
          </a>
          {window.localStorage.getItem("access_token") ? (
            <a
              href="http://localhost:80/user"
              className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem]"
            >
              <PrettyProfilePicture user={userCredentials} />
            </a>
          ) : (
            <PrettyHeaderSignIn />
          )}
          <button onClick={() => setShowSettings(!showSettings)} className="flex items-center">
            <PrettyHeaderOptions />
          </button>
        </div>
      </div>
      <div className={`${showCategories ? "block" : "hidden"}`}>
        <Categories />
      </div>
      <div className={`${showSettings ? "block" : "hidden"}`}>
        <HeaderOptionsMenu />
      </div>
    </div>
  );
};

export default Header;
