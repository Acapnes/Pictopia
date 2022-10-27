import { PrettySmallArrowDown } from "./PrettyIcons";

const PrettyPictureAuthorAvatar = (props: any) => {
  return (
    <div
      className={`w-[${props.size}] h-full flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[${props.size}]`}
    >
      <img
        src={`data:${props?.picture?.authorPic?.avatar?.contentType};base64,${props?.picture?.authorPic?.avatar?.data}`}
        alt=""
        className={`rounded-full w-full h-full p-[0.12rem] min-w-[${props.size}]`}
      />
    </div>
  );
};

const PrettyRotatingArrow = (props: any) => {
  return (
    <div
      className={`flex items-center ${
        props.state ? "duration-300 -rotate-180" : "duration-300 rotate-0 "
      }`}
    >
      <PrettySmallArrowDown />
    </div>
  );
};

export { PrettyPictureAuthorAvatar, PrettyRotatingArrow };