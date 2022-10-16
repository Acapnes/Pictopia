import { useEffect, useState } from "react";
import { UserAPI } from "../../Api/UserApi";
import { UserDto } from "../../Api/UserDtos/userDto";
import Header from "../../Menus/Header";
import ProfileCredentials from "../components/ProfileCredentials";
import UsersAlbum from "../components/UsersAlbum";

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
      <Header />
      <div className=" w-full h-full p-5 lg:p-10">
        <ProfileCredentials user={userCredentials} />
        <UsersAlbum />
      </div>
    </div>
  );
};

export default Profile;
