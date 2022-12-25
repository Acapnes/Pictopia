import React, { useRef } from "react";
import { CommentAPI } from "../../Api/Comment/CommentApi";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyElements";
import { PrettySend } from "../../components/Prettys/PrettyIcons";

const SendComment: React.FC<{
  getCommentsById: Function;
  author: UserDto;
  picture: PicDto;
}> = ({ getCommentsById, picture, author }) => {
  const newCommentsRef = useRef<HTMLTextAreaElement>(null);
  

  const postComment = async () => {
    await CommentAPI.postCommentToPicture(
      window.localStorage.getItem("access_token")!,
      {
        comment: newCommentsRef?.current?.value!,
        destPicture: picture?._id,
        creationDate: new Date(),
      }
    ).then(() => {
      getCommentsById();
      newCommentsRef.current!.value = "";
    });
  };

  return (
    <div className="flex flex-row space-x-2 items-center text-black">
      <PrettyMediumAvatar user={author} rounded={true} />
      <div className="w-full flex flex-row pl-1 bg-gray-200 h-[2.5rem]">
        <textarea
          id="InputNewComment"
          onKeyDown={(e) => {
            e.key === "Enter" && postComment();
          }}
          ref={newCommentsRef}
          className="w-full h-full bg-transparent outline-none flex py-1.5 resize-none placeholder:font-normal placeholder:text-md"
          placeholder="Sign new comment"
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

export default SendComment;
