import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import UserSocialList from "./components/UserSocialList";
import AddSocial from "./components/AddSocial";

const ProfileSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-2 text-gray-200">
          <p className="text-2xl font-bold">Security Permissions</p>
          <div className="flex flex-col space-y-1 text-lg pl-3">
            <div className="flex flex-row items-center space-x-3">
              <span>Other users can see my saved pictures</span>
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-pretty-rough-pink focus:ring-2 accent-pink-500"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-pretty-pink" />
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <UserSocialList user={user} showUrl={true} column />
        <AddSocial user={user} />
      </div>
    </div>
  );
};

export default ProfileSocial;
