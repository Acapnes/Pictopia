import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import UserSocialList from "./components/UserSocialList";
import AddSocial from "./components/AddSocial";

const ProfileSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-2 text-gray-200">
          <p className="text-2xl font-bold">Social Permissions</p>
          <div className="flex flex-col  space-y-1 text-lg">
            <div className="flex flex-row items-center space-x-5">
              <p>Other users can see my saved pictures</p>
              <input type="checkbox" className="accent-pink-500 w-4 h-4" />
            </div>
          </div>
        </div>

        <hr className="w-full border-pretty-pink" />
        <UserSocialList user={user} showUrl={true} column />
        <AddSocial user={user} />
      </div>
    </div>
  );
};

export default ProfileSocial;
