import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyHeaderSignIn } from "../../components/Prettys/PrettyButtons";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyComponents";

const HeaderAccount: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex items-center">
      {window.localStorage.getItem("access_token") ? (
        <PrettyMediumAvatar user={user} rounded={false} />
      ) : (
        <PrettyHeaderSignIn />
      )}
    </div>
  );
};

export default HeaderAccount;
