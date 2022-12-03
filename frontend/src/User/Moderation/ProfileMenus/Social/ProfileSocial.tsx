import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import Email from "./components/Email";
import Socials from "./components/Socials";

const ProfileSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <Socials user={user} />
        <hr className="w-full border-pretty-pink" />
        <Email user={user?.email} />
        <hr className="w-full border-pretty-pink" />
      </div>
    </div>
  );
};

export default ProfileSocial;
