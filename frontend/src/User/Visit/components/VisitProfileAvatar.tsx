import { UserDto } from "../../../Api/User/UserDtos/userDto";
import {
  PrettyProfileIcon,
  PrettyProfilePicture,
} from "../../../components/Prettys/PrettyIcons";

const ProfileAvatar: React.FC<{ userAvatar: UserDto["avatar"] }> = ({
  userAvatar,
}) => {
  console.log(userAvatar);
  return (
    <div className="w-full h-full flex justify-center">
      {userAvatar?.data || userAvatar?.contentType ? (
        <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] w-[15rem] rounded-sm relative p-[0.12rem]">
          <PrettyProfilePicture userAvatar={userAvatar} />
        </div>
      ) : (
        <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm w-[12rem] h-[12rem] relative p-[0.2rem]">
          <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-sm">
            <PrettyProfileIcon size={70} fill={"white"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
