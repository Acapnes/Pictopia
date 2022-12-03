import React, { useState } from "react";
import { CommentAPI } from "../../Api/Comment/CommentApi";
import { PicDto } from "../../Api/Pic/PicDtos/picDto";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettySend } from "../../components/Prettys/PrettyButtons";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyComponents";

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

export default PrettySendCommentOrReply;
