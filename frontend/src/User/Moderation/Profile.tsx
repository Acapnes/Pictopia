import { useEffect, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import Header from "../../Menus/Header";
import ProfileSelections from "./components/ProfileSelections";
import ProfileEdit from "./ProfileMenus/ProfileEdit";
import ProfilePrivacy from "./ProfileMenus/ProfilePrivacy";

const Profile = () => {
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);
  const [urlParam, setUrlParam] = useState<string>();

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
    setUrlParam(await MultiFuncs.UrlParam());
  };

  useEffect(() => {
    initFetchCredentials();
  }, []);

  return (
    <div className="min-h-screen h-full bg-soft-black">
      <Header />
      {/* <ProfileAvatar user={userCredentials} /> */}
      <div className="w-full h-full flex justify-center p-10">
        <div className="w-[70rem] h-full flex flex-col lg:flex-row lg:space-x-5">
        <ProfileSelections user={userCredentials} />
          <div className="w-full h-full">
            {urlParam === "edit" && <ProfileEdit user={userCredentials} />}
            {urlParam === "privacy" && <ProfilePrivacy />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
