import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { AccountAPI } from "../../Api/User/AccountApi";
import { ModerationAPI } from "../../Api/User/ModerationApi";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyElements";
import {
  PrettyCameraIcon,
  PrettyXIcon,
} from "../../components/Prettys/PrettyIcons";
import { Notfound } from "../../components/Prettys/PrettyViews";
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

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [postPerPage, setPostPerPage] = useState<number>(20);

  const handleScroll = (e: any) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 5
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {userVisitCredentials?.email ? (
        <>
          <div className="w-full h-full flex flex-col pb-4 text-gray-200">
            <VisitUserBody author={userVisitCredentials} />
            <div className="w-full flex flex-wrap place-content-center text-gray-200 bg-rough-soft-black bg-opacity-95">
              <VisitLinkComp to={``}>Saved</VisitLinkComp>
              <VisitLinkComp to={`posted`}>Posted</VisitLinkComp>
              <VisitLinkComp to={`comments`}>Comments</VisitLinkComp>
              <VisitLinkComp to={`followers`}>Followers</VisitLinkComp>
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

const VisitUserBody: React.FC<{ author: UserDto }> = ({ author }) => {
  return (
    <div className="w-full h-full relative border-2 border-t-0 border-extra-light-soft-black">
      <img
        src={`${
          author?.profile_background?.contentType &&
          author?.profile_background?.data
            ? `data:${author?.profile_background?.contentType};base64,${author?.profile_background?.data}`
            : `/background.png`
        } `}
        alt=""
        className="w-full min-h-[40vh] max-h-[62vh] object-cover opacity-90"
      />
      <div className="w-full absolute bottom-0 pb-4 bg-gradient-to-t from-light-soft-black">
        <div className="flex flex-col items-center">
          <PrettyCustomSizeAvatar avatar={author["avatar"]} size={9} />
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-gray-200">{author?.name}</p>
            <p className="text-gray-200">{author?.username}</p>
          </div>
          <div className="w-fit flex flex-row justify-center pt-3 items-center space-x-5">
            <VisitUserSocials user={author} />
          </div>
          <BackgroundHandler author={author} />
        </div>
      </div>
    </div>
  );
};

const VisitLinkComp: React.FC<{ children: ReactNode; to: string }> = ({
  children,
  to,
}): ReactElement<HTMLLinkElement> => {
  const params = useParams() as any;

  return (
    <Link
      to={to}
      className={`w-[50%] lg:w-[25%] px-4 py-2.5 flex items-center justify-center transition duration-500 ${
        params["*"] === to
          ? "bg-light-soft-black text-pretty-pink"
          : "hover:text-pretty-pink"
      } `}
    >
      {children}
    </Link>
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
        <>
          <div className="flex flex-row space-x-1.5 items-center text-xs pt-2">
            <button
              onClick={handleClick}
              className="flex flex-row space-x-1 items-center border-[2px] rounded-sm border-rough-soft-black border-opacity-75 py-0.5 px-1 bg-rough-soft-black"
            >
              <PrettyCameraIcon size={12} />
              <p className="rounded-sm">Change Background</p>
            </button>
            <button
              onClick={() => removeAvatarFunc()}
              className="w-fit flex flex-row space-x-1 items-center border-[2px] rounded-sm border-rough-soft-black border-opacity-75 py-0.5 px-1 bg-rough-soft-black"
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
        </>
      )}
    </>
  );
};
