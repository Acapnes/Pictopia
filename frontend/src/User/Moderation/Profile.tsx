import { useEffect, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import Header from "../../Menus/Header";
import ProfileSelections from "./components/ProfileSelections";
import Blocking from "./ProfileMenus/Blocking/Blocking";
import ProfileEdit from "./ProfileMenus/Edit/ProfileEdit";
import Management from "./ProfileMenus/Management/Management";
import ProfileSocial from "./ProfileMenus/Social/ProfileSocial";

const Profile: React.FC<{}> = () => {
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
      <div className="w-full h-full flex justify-center p-3">
        <div className="w-[70rem] h-full flex flex-col">
          <ProfileSelections />
          <div className="w-full h-full">
            {urlParam === "edit" && <ProfileEdit user={userCredentials} />}
            {urlParam === "privacy" && <ProfileSocial user={userCredentials} />}
            {urlParam === "management" && <Management user={userCredentials} />}
            {urlParam === "blocking" && <Blocking user={userCredentials} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
