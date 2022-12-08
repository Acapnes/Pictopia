import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import UserSocialList from "./components/UserSocialList";
import AddSocial from "./components/AddSocial";

const ProfileSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm">
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-2 text-gray-200">
          <p className="text-2xl font-bold">Security Permissions</p>
          <div className="flex flex-col space-y-1 text-lg pl-3">
            <div className="flex flex-row items-center space-x-3">
              <span>Private account</span>
              <ToggleSwitch />
            </div>
            <span className="text-sm text-gray-500">
              When your account is private, only people you approve can see your
              posted, saved pictures & comments on your profile.
            </span>
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

const ToggleSwitch: React.FC<{ status?: boolean }> = ({ status }) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={status} />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700
        peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
        after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
        after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      ></div>
    </label>
  );
};
