import React, {
  ReactElement,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { AccountAPI } from "../Api/User/AccountApi";
import { ModerationAPI } from "../Api/User/ModerationApi";
import { UserAPI } from "../Api/User/UserApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../components/Prettys/PrettyElements";
import {
  PrettyCameraIcon,
  PrettyXIcon,
} from "../components/Prettys/PrettyIcons";
import { SuspenseVeiw } from "../components/Prettys/PrettyViews";

const User: React.FC<{ user: UserDto }> = ({ user }) => {
  const [userVisitCredentials, setUserVisitCredentials] = useState<UserDto>();
  const params = useParams() as any;

  useEffect(() => {
    (async () => {
      setUserVisitCredentials(
        await AccountAPI.VisitProfileFetchUser(params.id)
      );
    })();
  }, []);

  return (
    <>
      {!user?.email && <Navigate to={"/error"} />}
      <div>
        <div className="w-full h-full flex flex-col">
          <UserPanel author={userVisitCredentials!} />
          <div className="flex flex-col-reverse md:flex-row pt-5">
            <UserMenus author={userVisitCredentials!} />
            <UserInfo author={userVisitCredentials!} />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;

const UserPanel: React.FC<{ author: UserDto }> = ({ author }) => {
  return (
    <div className="w-full h-full relative ">
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
      <div className="h-full w-full absolute flex justify-center top-0 left-0">
        <div className="h-full w-full md:w-[90%] px-5 py-10 flex flex-col space-y-3 justify-end">
          <div className="flex flex-row items-center space-x-4">
            <PrettyCustomSizeAvatar avatar={author?.avatar} size={7} />
            <div className="flex flex-col space-y-2.5">
              <p className="text-2xl md:text-[2.75rem] font-extrabold text-gray-200">
                {author?.name}
              </p>
              <p className="text-lg md:text-xl text-gray-200">
                {author?.username}
              </p>
            </div>
          </div>
          <div className="flex flex-row space-x-1.5">
            <div className="flex flex-row space-x-1">
              <p className=" font-extrabold text-gray-300">175</p>
              <p className=" font-extrabold text-gray-300">Followers</p>
            </div>
            <p className=" font-extrabold text-gray-300"> | </p>
            <div className="flex flex-row space-x-1">
              <p className=" font-extrabold text-gray-300">23</p>
              <p className=" font-extrabold text-gray-300">Posted</p>
            </div>
          </div>
          {/* <div className="flex flex-wrap ">
            {author?.userSocials?.map(
              (social: UserDto["userSocials"][0], socialIndex: number) => (
                <div key={socialIndex}>
                  <PrettySocialButton
                    showUrl={false}
                    socialUrl={social.url!}
                    platform={social.platform!}
                    socialIndex={social.index!}
                  ></PrettySocialButton>
                </div>
              )
            )}
          </div> */}
        </div>
        {/* <BackgroundHandler author={author} /> */}
      </div>
    </div>
  );
};

const UserInfo: React.FC<{ author: UserDto }> = ({ author }) => {
  return (
    <div className="w-full md:w-[50%] flex flex-col">
      <div>{author?.username}</div>
    </div>
  );
};

const UserMenus: React.FC<{ author: UserDto }> = ({ author }) => {
  return (
    <div className="w-full flex flex-col space-y-3 items-center justify-center">
      <div className="flex flex-row space-x-5">
        <LinkComp to="saved">
          <p>Saved</p>
        </LinkComp>
        <LinkComp to="posted">
          <p>Posts</p>
        </LinkComp>
        <LinkComp to="comments">
          <p>Comments</p>
        </LinkComp>
        <LinkComp to="followers">
          <p>Followers</p>
        </LinkComp>
      </div>
      <Suspense fallback={<SuspenseVeiw />}>
        <Outlet />
      </Suspense>
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
        className={`bg-soft-black px-3 flex items-center justify-center transition duration-500 text-gray-300 font-bold ${
          params["*"] !== to && "pb-0.5"
        } `}
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
