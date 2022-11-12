import { useEffect, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import Header from "../../Menus/Header";
import VisitUserAlbumGrid from "./components/VisitUserAlbumGrid";
import VisitProfileAvatar from "./components/VisitProfileAvatar";
import VisitUserInfo from "./components/VisitUserInfo";
import VisitUserLinks from "./components/VisitUserLinks";

const User = () => {
  const [userVisitCredentials, setUserVisitCredentials] = useState<UserDto>();

  const setUserCredentials = async () => {
    setUserVisitCredentials(
      await UserAPI.VisitProfileFetchUser(await MultiFuncs.UrlParam())
    );
  };
  useEffect(() => {
    setUserCredentials();
  }, []);

  return (
    <div className="min-h-screen h-full bg-soft-black">
      <Header />
      <div className="w-full h-full flex flex-col space-y-20">
        {userVisitCredentials && (
          <div className="w-full h-full flex flex-col space-y-3 items-center">
            <VisitProfileAvatar userAvatar={userVisitCredentials} />
            <VisitUserInfo user={userVisitCredentials!} />
            <VisitUserLinks user={userVisitCredentials!} />
          </div>
        )}
        <VisitUserAlbumGrid />
      </div>
    </div>
  );
};

export default User;
