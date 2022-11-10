import UserAlbumGrid from "../Grids/UserAlbumGrid";
import Header from "../Menus/Header";
import Profile from "./Moderation/Profile";
import VisitProfile from "./Visit/VisitProfile";

const User = () => {
  return (
    <div className="min-h-screen h-full bg-soft-black">
      <Header />
      {/* <VisitProfile /> */}
      <Profile />
      <UserAlbumGrid/>
    </div>
  );
};

export default User;
