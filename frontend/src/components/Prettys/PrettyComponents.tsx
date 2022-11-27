import { useState } from "react";
import { CommentAPI } from "../../Api/Comment/CommentApi";
import { PicDto } from "../../Api/Pic/PicDtos/picDto";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../Functions/MultipleFuncs";
import { PrettySend } from "./PrettyButtons";
import { PrettyProfileIcon, PrettySmallArrowDown } from "./PrettyIcons";

const PrettyLargeAvatar: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="w-fit">
      {MultiFuncs.ParamController([
        user?.avatar?.contentType,
        user?.avatar?.data,
      ]) ? (
        <a href={`/user/${user?.username}`} className="rounded-full ">
          <div
            className={`h-full w-[6rem] flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm`}
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
            className={`w-full h-full object-cover p-[0.12rem] min-w-[4rem] max-h-[4rem] ${
              rounded ? " rounded-full" : "rounded-sm"
            }`}
          />
        </a>
      ) : (
        <a
          href={`/user/${user?.username}`}
          className={`flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem] h-[4rem] relative p-[0.2rem]`}
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

const PrettySendCommentOrReply: React.FC<{
  getCommentsById: Function;
  author: UserDto;
  picture: PicDto;
}> = ({ getCommentsById, picture, author }) => {
  const [newCommentsComment, setNewCommentsComment] = useState(String);
  const postComment = async () => {
    if (window.localStorage.getItem("access_token")) {
      await CommentAPI.postCommentToPicture(
        window.localStorage.getItem("access_token")!,
        {
          comment: newCommentsComment,
          destPicture: picture?._id,
        }
      ).then(() => getCommentsById());
    }
  };

  return (
    <div className="flex flex-row space-x-2 items-center">
      <PrettyMediumAvatar user={author} rounded={true} />
      <div className="w-full flex flex-row pl-1 bg-gray-200 h-[2.5rem]">
        <textarea
          id="InputNewComment"
          onChange={(e) => setNewCommentsComment(e.target.value)}
          className="w-full h-full bg-transparent outline-none flex py-1.5 resize-none placeholder:font-normal placeholder:text-md"
          placeholder="Sıgn new comment"
        />
        <div
          onClick={() => postComment()}
          className="h-full flex items-center px-2 hover:bg-pretty-pink hover:bg-opacity-40 cursor-pointer"
        >
          <PrettySend size={18} fill="rgb(244, 114, 182)" />
        </div>
      </div>
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

const PrettyHeaderNullAvatar: React.FC<{}> = (props: any) => {
  return (
    <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[4rem] relative p-[0.12rem]">
      <div className="w-full h-full flex items-center justify-center bg-soft-black py-1 rounded-sm">
        <PrettyProfileIcon size={props.nullAvatarSize} fill={"white"} />
      </div>
    </div>
  );
};

export {
  PrettySendCommentOrReply,
  PrettyLargeAvatar,
  PrettyMediumAvatar,
  PrettyRotatingArrow,
  PrettyHeaderNullAvatar,
};
