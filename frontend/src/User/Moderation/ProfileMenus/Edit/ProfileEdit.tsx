import { useState } from "react";
import { ModerationAPI } from "../../../../Api/User/ModerationApi";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyComponents";
import ProfileAvatar from "./ProfileAvatar";

const ProfileEdit: React.FC<{ user: UserDto }> = ({ user }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState("");
  const [inputBio, setInputBio] = useState("");

  const simpleUpdateProfile = async () => {
    if (window.localStorage.getItem("access_token")) {
      await ModerationAPI.userEditProfile(
        window.localStorage.getItem("access_token")!,
        {
          username: inputUsername || user?.username,
          name: inputName || user?.name,
          birthDate: inputBirthDate || user?.birthDate,
          bio: inputBio || user?.bio,
        }
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
      <div
        className={` grid grid-cols-1 gap-y-3 px-5 pb-[1rem] pt-[2rem] rounded-sm bg-soft-black`}
      >
        <ProfileAvatar user={user} />
        <div className="space-y-2">
          <div className="text-center flex items-center">
            <p className="font-semibold text-gray-200">Username</p>
          </div>
          <input
            type="text"
            id="inputUsername"
            className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
            placeholder={user?.username}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="text-center flex items-center">
            <p className="font-semibold text-gray-200">Name</p>
          </div>
          <input
            type="text"
            id="inputName"
            className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
            placeholder={user?.name}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="text-center flex items-center">
            <p className="font-semibold text-gray-200">BirthDate</p>
          </div>
          <input
            type="text"
            className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
            placeholder={user?.birthDate}
            onChange={(e) => setInputBirthDate(e.target.value)}
          />
        </div>
        <div className="col-span-1 space-y-2 h-full pb-[2.5rem]">
          <div className="text-center flex items-center">
            <p className="font-semibold text-gray-200">Bio</p>
          </div>
          <textarea
            className="w-full h-full break-words px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800 resize-none"
            placeholder={user?.bio}
            onChange={(e) => setInputBio(e.target.value)}
          />
        </div>
        <div className="col-span-1 w-full flex justify-end">
          <PrettyRainbow
            advStyle="cursor-pointer"
            onclick={() => simpleUpdateProfile()}
          >
            <div className="px-2 py-0.5">
              <span className="text-white">Save</span>
            </div>
          </PrettyRainbow>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
