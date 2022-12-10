import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyElements";
import { PrettySignIcon } from "../../components/Prettys/PrettyIcons";

const HeaderAccount: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="flex items-center">
      {user?.email ? (
        <PrettyMediumAvatar user={user} rounded={true} />
      ) : (
        <PrettyRainbow
          onclick={() => (window.location.href = "/login")}
          advStyle="whitespace-nowrap text-gray-200 cursor-pointer"
        >
          <span className="hidden md:block">SIGN IN</span>
          <div className="block md:hidden">
            <PrettySignIcon size={20} />
          </div>
        </PrettyRainbow>
      )}
    </div>
  );
};

export default HeaderAccount;
