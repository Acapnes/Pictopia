import { PicDto } from "../../Api/Pic/picDtos";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "./PrettyFuncs";
import { PrettyProfileIcon, PrettySmallArrowDown } from "./PrettyIcons";

const PrettyLargeAvatar: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="w-fit">
      {MultiFuncs.ParamController([
        user?.avatar?.contentType,
        user?.avatar?.data,
      ]) ? (
        <a href={`/user/${user?.username}`} className="rounded-full">
          <div
            className={`h-fit w-[6rem] flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm p-0.5`}
          >
            <img
              src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.data}`}
              alt=""
              className={`rounded-sm w-full h-full max-w-[6rem] bg-soft-black`}
            />
          </div>
        </a>
      ) : (
        <a href={`/user/${user?.username}`} className="w-fit rounded-full">
          <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[6rem] h-[6rem] w-fit relative p-0.5">
            <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-sm">
              <PrettyProfileIcon size={32} fill={"white"} />
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

const PrettyMediumAvatar: React.FC<{ user: UserDto; rounded: boolean }> = ({
  user,
  rounded,
}) => {
  return (
    <div className="w-fit">
      {MultiFuncs.ParamController([
        user.avatar?.contentType,
        user.avatar?.data,
      ]) ? (
        <a
          href={`/user/${user?.username}`}
          className={`flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] w-[4rem] max-h-[4rem] ${
            rounded ? " rounded-full" : "rounded-sm"
          }`}
        >
          <img
            src={`data:${user.avatar?.contentType};base64,${user.avatar?.data}`}
            alt=""
            className={`w-full h-full object-cover p-0.5 min-w-[4rem] max-h-[4rem] ${
              rounded ? " rounded-full" : "rounded-sm"
            }`}
          />
        </a>
      ) : (
        <a
          href={`/user/${user?.username}`}
          className={`flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem] h-[4rem] relative p-0.5`}
        >
          <div
            className={`w-full h-full flex items-center justify-center bg-soft-black ${
              rounded ? " rounded-full" : "rounded-sm"
            }`}
          >
            <PrettyProfileIcon size={32} fill={"white"} />
          </div>
        </a>
      )}
    </div>
  );
};

const PrettySmallAvatar: React.FC<{ user: UserDto; rounded: boolean }> = ({
  user,
  rounded,
}) => {
  return (
    <div className="w-fit">
      {MultiFuncs.ParamController([
        user.avatar?.contentType,
        user.avatar?.data,
      ]) ? (
        <a
          href={`/user/${user?.username}`}
          className={`flex w-[2.5rem] max-h-[2.5rem] ${
            rounded ? " rounded-full" : "rounded-sm"
          }`}
        >
          <img
            src={`data:${user.avatar?.contentType};base64,${user.avatar?.data}`}
            alt=""
            className={`w-full h-full object-cover min-w-[2.5rem] max-h-[2.5rem] ${
              rounded ? " rounded-full" : "rounded-sm"
            }`}
          />
        </a>
      ) : (
        <a
          href={`/user/${user?.username}`}
          className={`flex rounded-full min-w-[2.5rem] h-[2.5rem] relative`}
        >
          <div
            className={`w-full h-full flex items-center justify-center bg-soft-black ${
              rounded ? " rounded-full" : "rounded-sm"
            }`}
          >
            <PrettyProfileIcon size={24} fill={"white"} />
          </div>
        </a>
      )}
    </div>
  );
};

const PrettyCustomSizeAvatar: React.FC<{
  avatar: UserDto["avatar"];
  size: number;
  bordered?: boolean;
}> = ({ avatar, size, bordered }) => {
  return (
    <div className="w-fit">
      {MultiFuncs.ParamController([avatar?.contentType, avatar?.data]) ? (
        <div
          style={{ width: `${size}rem`, height: `${size}rem` }}
          className={`flex relative rounded-sm bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] ${
            bordered && "p-0.5"
          }`}
        >
          <img
            src={`data:${avatar?.contentType};base64,${avatar?.data}`}
            alt=""
            className="w-full object-cover rounded-sm"
          />
        </div>
      ) : (
        <div
          style={{ width: `${size}rem`, height: `${size}rem` }}
          className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full relative p-0.5"
        >
          <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full p-0.5">
            <PrettyProfileIcon size={size * 8} fill={"white"} />
          </div>
        </div>
      )}
    </div>
  );
};

const PrettyCustomSizePicture: React.FC<{
  picture: PicDto["picture_file"];
  size: number;
}> = ({ picture, size }) => {
  return (
    <div className="w-fit">
      {MultiFuncs.ParamController([picture?.contentType, picture?.data]) ? (
        <div
          style={{ width: `${size}rem`, height: `${size}rem` }}
          className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] relative p-0.5 rounded-full"
        >
          <img
            src={`data:${picture?.contentType};base64,${picture?.data}`}
            alt=""
            className="w-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div
          style={{ width: `${size}rem`, height: `${size}rem` }}
          className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full relative p-0.5"
        >
          <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full p-10">
            <PrettyProfileIcon size={70} fill={"white"} />
          </div>
        </div>
      )}
    </div>
  );
};

const PrettyRotatingArrow: React.FC<{
  state: boolean;
  size?: number;
  fill?: string;
}> = ({ state, size, fill }) => {
  return (
    <div
      className={`flex items-center ${
        state ? "duration-300 -rotate-180" : "duration-300 rotate-0 "
      }`}
    >
      <PrettySmallArrowDown size={size} fill={fill} />
    </div>
  );
};

export {
  PrettyLargeAvatar,
  PrettyMediumAvatar,
  PrettySmallAvatar,
  PrettyCustomSizeAvatar,
  PrettyRotatingArrow,
};
