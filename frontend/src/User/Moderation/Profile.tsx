import { useEffect, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import ProfileMainView from "../components/ProfileMainView";

const Profile = () => {
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
      <ProfileMainView user={userCredentials} />
    </div>
  );
};

export default Profile;
