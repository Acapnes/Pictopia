import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { AccountAPI } from "../../Api/User/AccountApi";
import { ModerationAPI } from "../../Api/User/ModerationApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyElements";
import {
  PrettyCameraIcon,
  PrettyXIcon,
} from "../../components/Prettys/PrettyIcons";
import Notfound from "../../components/Views/NotFound";
import {} from "./components/PrettySocialButtons";
import VisitUserSocials from "./components/VisitUserSocials";

const Visit: React.FC<{}> = () => {
  const [userVisitCredentials, setUserVisitCredentials] = useState<UserDto>();
  const params = useParams() as any;

  const setUserCredentials = async () => {
    setUserVisitCredentials(await AccountAPI.VisitProfileFetchUser(params.id));
  };

  useEffect(() => {
    setUserCredentials();
  }, []);

  return (
    <div>
      {userVisitCredentials?.email ? (
        <>
          <div className="w-full h-full flex flex-col pb-4 text-gray-200">
            <div className="w-full h-full relative ">
              <img
                src={`${
                  userVisitCredentials?.profile_background?.contentType &&
                  userVisitCredentials?.profile_background?.data
                    ? `data:${userVisitCredentials?.profile_background?.contentType};base64,${userVisitCredentials?.profile_background?.data}`
                    : `/background.png`
                } `}
                alt=""
                className="w-full min-h-[40vh] max-h-[50vh] object-cover opacity-90"
              />
              <BackgroundHandler />
              <div className="w-full absolute bottom-0 pb-4 bg-gradient-to-t from-light-soft-black">
                <div className="flex flex-col items-center">
                  <PrettyCustomSizeAvatar
                    avatar={userVisitCredentials["avatar"]}
                    size={9}
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-gray-200">
                      {userVisitCredentials?.name}
                    </p>
                    <p className="text-gray-200">
                      {userVisitCredentials?.username}
                    </p>
                  </div>

                  <div className="w-fit flex flex-row justify-center pt-3 items-center space-x-5">
                    <VisitUserSocials user={userVisitCredentials} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row place-content-center text-gray-200 bg-rough-soft-black bg-opacity-95">
              <VisitLinkComp to={``}>Saved</VisitLinkComp>
              <VisitLinkComp to={`posted`}>Posted</VisitLinkComp>
              <VisitLinkComp to={`comments`}>Comments</VisitLinkComp>
              <VisitLinkComp to={`followers`}>Followers</VisitLinkComp>
              {/* <PrettyProfileCopyButton /> */}
              {/* <PrettyShareProfileButton /> */}
            </div>
          </div>
          <Outlet />
        </>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Visit;

const VisitLinkComp: React.FC<{ children: ReactNode; to: string }> = ({
  children,
  to,
}): ReactElement<HTMLLinkElement> => {
  const params = useParams() as any;

  return (
    <Link
      to={to}
      className={`px-4 py-3 flex items-center transition duration-500 ${
        params["*"] === to
          ? "bg-light-soft-black text-pretty-pink"
          : "hover:text-pretty-pink"
      } `}
    >
      {children}
    </Link>
  );
};

export const BackgroundHandler: React.FC<{}> = () => {
  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = async () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const changeAvatarFunc = async (avatar: any) => {
    await ModerationAPI.changeUserBackground(
      avatar,
      window.localStorage.getItem("access_token")!
    );
  };

  const removeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await ModerationAPI.removeUserBackground(
        window.localStorage.getItem("access_token")!
      );
    }
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    await changeAvatarFunc(fileUploaded);
  };

  return (
    <div className="absolute right-7 top-7 text-xs">
      <div className="flex flex-col space-y-1.5 items-end">
        <button
          onClick={handleClick}
          className="flex flex-row space-x-1 items-center border-[1px] border-pretty-pink py-0.5 px-1 bg-rough-soft-black"
        >
          <PrettyCameraIcon size={12} />
          <p className=" rounded-sm">Change Background</p>
        </button>
        <button
          onClick={() => removeAvatarFunc()}
          className="w-fit flex flex-row space-x-1 items-center border-[1px] border-pretty-pink py-0.5 px-1 bg-rough-soft-black"
        >
          <PrettyXIcon size={10} />
          <p className=" rounded-sm">Remove</p>
        </button>
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </div>
  );
};
