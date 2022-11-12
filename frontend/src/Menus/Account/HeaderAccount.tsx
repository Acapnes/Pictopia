import { PrettyHeaderSignIn } from "../../components/Prettys/PrettyButtons";
import { PrettyHeaderNullAvatar } from "../../components/Prettys/PrettyComponents";
import { PrettyProfilePicture } from "../../components/Prettys/PrettyIcons";

const HeaderAccount = (props: any) => {
  return (
    <div className="flex">
      {window.localStorage.getItem("access_token") ? (
        props.userCredentials?.avatar?.data ||
        props.userCredentials?.avatar?.contentType ? (
          <a
            href={`/user/${props?.userCredentials?.username}`}
            className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[4rem]"
          >
            <PrettyProfilePicture user={props.userCredentials} />
          </a>
        ) : (
          <a
            href={`/user/${props?.userCredentials?.username}`}
            className="flex items-center"
          >
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
