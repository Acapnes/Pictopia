import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyElements";
import Notfound from "../../components/Views/NotFound";
import {
  PrettyProfileCopyButton,
  PrettyShareProfileButton,
} from "./components/PrettySocialButtons";
import VisitUserSocials from "./components/VisitUserSocials";

const Visit: React.FC<{}> = () => {
  const [userVisitCredentials, setUserVisitCredentials] = useState<UserDto>();
  const params = useParams() as any;

  const setUserCredentials = async () => {
    setUserVisitCredentials(await UserAPI.VisitProfileFetchUser(params.id));
  };

  useEffect(() => {
    setUserCredentials();
  }, []);

  return (
    <div>
      {userVisitCredentials?.email ? (
        <>
          <div className="w-full h-full flex flex-col space-y-5 pb-5">
            <div className="w-full h-full flex flex-col space-y-3 items-center">
              <PrettyCustomSizeAvatar
                avatar={userVisitCredentials["avatar"]}
                size={25}
              />

              <div className="flex flex-col space-y-2 text-center">
                <p className="text-3xl font-bold text-gray-200">
                  {userVisitCredentials?.name}
                </p>
                <p className="text-lg text-gray-200">
                  {userVisitCredentials?.username}
                </p>
                <div className="w-fit flex flex-row justify-center items-center space-x-5">
                  <VisitUserSocials user={userVisitCredentials} />
                  <PrettyProfileCopyButton />
                  <PrettyShareProfileButton />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-center text-gray-200 bg-light-soft-black bg-opacity-95">
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

const VisitLinkComp: React.FC<{ children: ReactNode; to: string }> = ({
  children,
  to,
}): ReactElement<HTMLLinkElement> => {
  const params = useParams() as any;

  return (
    <Link
      to={to}
      className={`py-3 px-4 transition duration-500 ${
        params["*"] === to
          ? "bg-rough-soft-black text-pretty-pink"
          : "hover:text-pretty-pink"
      } `}
    >
      {children}
    </Link>
  );
};
