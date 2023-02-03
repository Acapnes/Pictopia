import React, {
  ReactElement,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { ModerationAPI } from "../Api/User/ModerationApi";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../Api/Utils/UtilsDtos";
import { PrettyCustomSizeAvatar } from "../components/Prettys/PrettyComponents";
import {
  PrettyCameraIcon,
  PrettyXIcon,
} from "../components/Prettys/PrettyIcons";
import { SuspenseVeiw } from "../components/Prettys/PrettyViews";
import { useAlertStore } from "../components/Zustand";

const User: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <>
      <div className="flex flex-col space-y-16 pb-10">
        <UserBackground author={user}>
          <UserPanel author={user} />
          <UserMenus author={user} />
        </UserBackground>
        <div className="px-20">
          <Suspense fallback={<SuspenseVeiw />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default User;

const UserBackground: React.FC<{ author: UserDto; children: ReactNode }> = ({
  author,
  children,
}) => {
  return (
    <div className="relative">
      <img
        src={`${
          author?.profile_background?.contentType &&
          author?.profile_background?.data
            ? `data:${author?.profile_background?.contentType};base64,${author?.profile_background?.data}`
            : `/background.png`
        } `}
        alt=""
        className="w-full h-[35vh] object-cover opacity-50"
      />
      <BackgroundHandler author={author} />
      {children}
    </div>
  );
};

const UserPanel: React.FC<{ author: UserDto }> = ({ author }) => {
  const setToastState = useAlertStore((state: any) => state.setToastState);
  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = async () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const changeAvatarFunc = async (avatar: any) => {
    await ModerationAPI.changeUserAvatar(
      avatar,
      window.localStorage.getItem("access_token")!
    ).then(
      async (loginResp: ReturnFuncDto) => await setToastState(loginResp.message)
    );
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    await changeAvatarFunc(fileUploaded);
  };

  return (
    <div className="h-full w-full absolute flex flex-col items-center top-0 left-0">
      <div className="h-full w-full md:w-[90%] px-5 py-14 flex flex-col space-y-3 justify-end">
        <div className="flex flex-row items-center space-x-4">
          <div className="group relative bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.05rem]">
            <PrettyCustomSizeAvatar avatar={author?.avatar} size={7} />
            <div className="z-20 absolute bottom-0 h-full w-full p-[0.05rem] pr-[0.1rem] group">
              <button
                onClick={() => handleClick()}
                className="h-full w-full p-1 flex items-center justify-center bg-rough-soft-black bg-opacity-0 opacity-0
               duration-300 group-hover:bg-opacity-75 group-hover:opacity-100"
              >
                <PrettyCameraIcon fill="white" size={24} />
              </button>
              <input
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleChange}
                accept="image/jpg, image/jpeg, image/png, image/webp, image/jfif, image/gif"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2.5">
            <p className="text-2xl md:text-[2.75rem] font-extrabold text-gray-200">
              {author?.name}
            </p>
            <p className="text-lg md:text-xl text-gray-200">
              {author?.username}
            </p>
          </div>
        </div>
        <div className="flex flex-row space-x-3 justify-between">
          <div className="flex flex-row space-x-1.5">
            <div className="flex flex-row space-x-1">
              <p className="font-extrabold text-gray-300">175</p>
              <p className="font-extrabold text-gray-300">Followers</p>
            </div>
            <p className="font-extrabold text-gray-300"> | </p>
            <div className="flex flex-row space-x-1">
              <p className="font-extrabold text-gray-300">23</p>
              <p className="font-extrabold text-gray-300">Posted</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

const UserMenus: React.FC<{ author: UserDto }> = ({ author }) => {
  return (
    <div className="w-full h-full flex items-end justify-end relative">
      <div className="absolute -top-[1.75rem] left-0 lg:px-20 w-full flex justify-center">
        <div className="w-full bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] lg:p-0.5 lg:rounded-sm">
          <div className="w-full flex flex-col lg:flex-row justify-between px-[3rem] py-3.5 bg-soft-black lg:rounded-sm overflow-x-auto">
            <div className="w-full flex flex-row space-x-[5rem]">
              <LinkComp to="saved">
                <p>Home</p>
              </LinkComp>
              <LinkComp to="posted">
                <p>Gallery</p>
              </LinkComp>
              <LinkComp to="comments">
                <p>Favorites</p>
              </LinkComp>
              <LinkComp to="followers">
                <p>Followers</p>
              </LinkComp>
            </div>
            <div className="w-full flex flex-row lg:justify-end space-x-[5rem]">
              <LinkComp to="saved">
                <p>Home</p>
              </LinkComp>
              <LinkComp to="posted">
                <p>Gallery</p>
              </LinkComp>
              <LinkComp to="comments">
                <p>Favorites</p>
              </LinkComp>
              <LinkComp to="followers">
                <p>Followers</p>
              </LinkComp>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkComp: React.FC<{ children: ReactNode; to: string }> = ({
  children,
  to,
}): ReactElement<HTMLLinkElement> => {
  const params = useParams() as any;

  return (
    <div className="bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
      <Link
        to={to}
        className={`flex items-center justify-center transition duration-500 text-gray-300 font-bold bg-soft-black ${
          params["*"] !== to && "pb-0.5"
        }  `}
      >
        {children}
      </Link>
    </div>
  );
};

export const BackgroundHandler: React.FC<{
  author: UserDto;
}> = ({ author }) => {
  const [visitorCredentials, setVisitorCredentials] = useState<UserDto>(Object);
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
    await ModerationAPI.removeUserBackground(
      window.localStorage.getItem("access_token")!
    );
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    await changeAvatarFunc(fileUploaded);
  };

  useEffect(() => {
    (async () => {
      setVisitorCredentials(
        await UserAPI.fetchUserCredentials(
          window.localStorage.getItem("access_token")!
        )
      );
    })();
  }, []);

  return (
    <>
      {visitorCredentials?._id === author?._id && (
        <div className="absolute w-full h-full top-0 flex items-center justify-center z-20 duration-500 opacity-0 hover:opacity-95">
          <div className="flex flex-row space-x-1.5 items-center text-sm text-gray-200">
            <button
              onClick={handleClick}
              className="flex flex-row space-x-1 items-center bor"
            >
              <PrettyCameraIcon size={16} />
              <p className="rounded-sm">Change Background</p>
            </button>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};
