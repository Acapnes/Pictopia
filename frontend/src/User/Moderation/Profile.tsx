import React from "react";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import Header from "../../Menus/Header";
import Blocking from "./ProfileMenus/Blocking/Blocking";
import ProfileEdit from "./ProfileMenus/Edit/ProfileEdit";
import AccountDeletion from "./ProfileMenus/Management/components/AccountDeletion";
import Management from "./ProfileMenus/Management/Management";
const ProfileSocial = React.lazy(
  () => import("./ProfileMenus/Social/ProfileSocial")
);

const Profile: React.FC<{}> = () => {
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
  };

  useEffect(() => {
    initFetchCredentials();
  }, []);

  return (
    <div className="min-h-screen h-full bg-soft-black">
      <Header />
      <div className="w-full h-full flex justify-center p-3">
        <div className="w-[70rem] h-full flex flex-col">
          <ProfileSelections />
          <Routes>
            <Route index element={<ProfileEdit user={userCredentials} />} />
            <Route
              path="social"
              element={<ProfileSocial user={userCredentials} />}
            />
            <Route
              path="management"
              element={<Management user={userCredentials} />}
            />
            <Route
              path="blocking"
              element={<Blocking user={userCredentials} />}
            />
            <Route path="deletion" element={<AccountDeletion />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileSelections: React.FC<{}> = () => {
  return (
    <div className="h-full min-w-[15rem] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 pb-3">
      <a href="/profile" className="rounded-sm">
        <PrettyProfileSelectionButton text={"Profile Edit"} />
      </a>
      <a href="/profile/social" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Social"} />
      </a>
      <a href="/profile/management" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Management"} />
      </a>
      <a href="/profile/blocking" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Blocking"} />
      </a>
      <Outlet />
    </div>
  );
};

const PrettyProfileSelectionButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <PrettyRainbow
      advStyle={`w-full min-w-[10rem] rounded-sm`}
      advChildStyle="w-full min-w-[10rem]"
    >
      <span className="text-white">{text}</span>
    </PrettyRainbow>
  );
};
