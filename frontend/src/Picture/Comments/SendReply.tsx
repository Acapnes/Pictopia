import React, { useRef } from "react";
import { CommentDto } from "../../Api/Comment/dtos/commentDto";
import { CommentAPI } from "../../Api/Comment/CommentApi";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyElements";
import { PrettySend } from "../../components/Prettys/PrettyIcons";
import { usePictureCommentStore } from "../../components/Zustand/store";

const SendReply: React.FC<{
  authorReply: UserDto;
  parentComment: CommentDto;
  picture: PicDto;
}> = ({ picture, authorReply, parentComment }) => {
  const newReplyRef = useRef<HTMLTextAreaElement>(null);

  const setCurrentReplies = usePictureCommentStore(
    (state: any) => state.setCurrentReplies
  );
  
  const setsendReplyViewState = usePictureCommentStore(
    (state: any) => state.setsendReplyViewState
  );

  const postReply = async () => {
    if (window.localStorage.getItem("access_token")) {
      await CommentAPI.postReplyToPicturesComment(
        window.localStorage.getItem("access_token")!,
        {
          comment: newReplyRef?.current?.value!,
          parentId: parentComment?._id,
          destPicture: picture?._id,
          creationDate: new Date(),
        }
      ).then(async () => {
        newReplyRef.current!.value = "";
        setCurrentReplies(await CommentAPI.getCommentReplies(parentComment));
        setsendReplyViewState(false);
      });
    }
  };

  return (
    <div className="flex flex-row space-x-2 items-center text-black">
      <PrettyMediumAvatar user={authorReply} rounded={true} />
      <div className="w-full flex flex-row pl-1 bg-gray-200 h-[2rem]">
        <textarea
          onKeyDown={(e) => {
            e.key === "Enter" && postReply();
          }}
          id="InputNewComment"
          ref={newReplyRef}
          className="w-full h-full bg-transparent outline-none flex py-1 resize-none placeholder:font-normal placeholder:text-md"
          placeholder="Sign new reply"
        />
        <div
          onClick={() => postReply()}
          className="h-full flex items-center px-2 hover:bg-pretty-pink hover:bg-opacity-40 cursor-pointer"
        >
          <PrettySend size={18} fill="rgb(244, 114, 182)" />
        </div>
      </div>
    </div>
  );
};

export default SendReply;
