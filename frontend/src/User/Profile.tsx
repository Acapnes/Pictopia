import Header from "../Header/Header";
import ProfileCredentials from "./components/ProfileCredentials";
import UsersAlbum from "./components/UsersAlbum";

const Profile = () => {
  return (
    <div className="min-h-screen h-full bg-stone-600 bg-opacity-60">
      <Header />
      <div className=" w-full p-5 lg:p-10  ">
        <ProfileCredentials />
        <UsersAlbum />
      </div>
    </div>
  );
};

export default Profile;
