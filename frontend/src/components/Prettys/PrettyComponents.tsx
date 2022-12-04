import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../Functions/MultipleFuncs";
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
            className={`h-fit w-[6rem] flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm`}
          >
            <img
              src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.data}`}
              alt=""
              className={`rounded-sm w-full h-full p-[0.12rem] max-w-[6rem]`}
            />
          </div>
        </a>
      ) : (
        <a href={`/user/${user?.username}`} className="w-fit rounded-full">
          <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[6rem] h-[6rem] w-fit relative p-[0.2rem]">
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

const PrettyRotatingArrow: React.FC<{ state: boolean }> = ({ state }) => {
  return (
    <div
      className={`flex items-center ${
        state ? "duration-300 -rotate-180" : "duration-300 rotate-0 "
      }`}
    >
      <PrettySmallArrowDown />
    </div>
  );
};

export { PrettyLargeAvatar, PrettyMediumAvatar, PrettyRotatingArrow };
