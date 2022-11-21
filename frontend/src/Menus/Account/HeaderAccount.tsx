import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyHeaderSignIn } from "../../components/Prettys/PrettyButtons";
import { PrettyHeaderNullAvatar } from "../../components/Prettys/PrettyComponents";
import { PrettyProfilePicture } from "../../components/Prettys/PrettyIcons";

const HeaderAccount: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex">
      {window.localStorage.getItem("access_token") ? (
        user?.avatar?.data || user?.avatar?.contentType ? (
          <a
            href={`/user/${user?.username}`}
            className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[4rem]"
          >
            <PrettyProfilePicture userAvatar={user.avatar} />
          </a>
        ) : (
          <a href={`/user/${user?.username}`} className="flex items-center">
            <PrettyHeaderNullAvatar nullAvatarSize={32} />
          </a>
        )
      ) : (
        <PrettyHeaderSignIn />
      )}
    </div>
  );
};

export default HeaderAccount;
