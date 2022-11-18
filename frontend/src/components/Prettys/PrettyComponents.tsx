import { PicDto } from "../../Api/Pic/PicDtos/picDto";
import { MultiFuncs } from "../Functions/MultipleFuncs";
import { PrettyProfileIcon, PrettySmallArrowDown } from "./PrettyIcons";

const PrettyPictureAuthorAvatar: React.FC<{ picture: PicDto }> = ({
  picture,
}) => {
  return (
    <div>
      {MultiFuncs.ParamController([
        picture?.authorPic?.avatar?.contentType,
        picture?.authorPic?.avatar?.data,
      ]) ? (
        <a href={"/user/"} className="rounded-full w-fit">
          <div
            className={`h-full w-[6rem] flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm`}
          >
            <img
              src={`data:${picture?.authorPic?.avatar?.contentType};base64,${picture?.authorPic?.avatar?.data}`}
              alt=""
              className={`rounded-sm w-full h-full p-[0.12rem] max-w-[6rem]`}
            />
          </div>
        </a>
      ) : (
        <a href={"/user/"} className="w-fit rounded-full">
          <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem] h-[4rem] w-fit relative p-[0.2rem]">
            <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
              <PrettyProfileIcon size={32} fill={"white"} />
            </div>
          </div>
        </a>
      )}
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

const PrettyHeaderNullAvatar = (props: any) => {
  return (
    <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[4rem] relative p-[0.12rem]">
      <div className="w-full h-full flex items-center justify-center bg-soft-black py-1 rounded-sm">
        <PrettyProfileIcon size={props.nullAvatarSize} fill={"white"} />
      </div>
    </div>
  );
};

const PrettyHeaderExtendCategory = (props: any) => {
  return (
    <div className="relative w-full text-start font-semibold text-white rounded-sm h-[20rem]">
      <img
        src={`data:${props?.category?.category_picture_file?.contentType};base64,${props?.category?.category_picture_file?.data}`}
        className="object-cover h-full w-full opacity-50 rounded-sm border-2"
        alt=""
      />
      <div className="absolute top-0 w-full h-full flex flex-row justify-center space-x-2 items-center text-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
        <p className="my-2 text-gray-200 font-bold text-xl ">
          {props?.category?.title}
        </p>
      </div>
    </div>
  );
};

export {
  PrettyPictureAuthorAvatar,
  PrettyRotatingArrow,
  PrettyHeaderExtendCategory,
  PrettyHeaderNullAvatar,
};
