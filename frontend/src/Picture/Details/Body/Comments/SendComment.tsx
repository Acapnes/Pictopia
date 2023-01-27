import React, { useRef } from "react";
import { CommentAPI } from "../../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../../Api/Comment/commentDtos";
import { PicDto } from "../../../../Api/Pic/picDtos";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import {
  PrettyCustomSizeAvatar,
  PrettyMediumAvatar,
} from "../../../../components/Prettys/PrettyElements";
import { PrettySend } from "../../../../components/Prettys/PrettyIcons";
import {
  usePictureCommentStore,
  useToastStore,
} from "../../../../components/Zustand/store";

const SendComment: React.FC<{
  visitor: UserDto;
  picture: PicDto;
}> = ({ picture, visitor }) => {
  const setToastState = useToastStore((state: any) => state.setToastState);
  const newCommentsRef = useRef<HTMLTextAreaElement>(null);

  const postComment = async () => {
    if (visitor?.email) {
      await CommentAPI.postCommentToPicture(
        window.localStorage.getItem("access_token")!,
        {
          comment: newCommentsRef?.current?.value!,
          destPicture: picture?._id,
          creationDate: new Date(),
        }
      ).then(() => {
        // getCommentsById();
        newCommentsRef.current!.value = "";
      });
    } else {
      await setToastState("Please login before");
    }
  };

  return (
    <div className="flex flex-row space-x-2 items-center text-black text-sm">
      <PrettyMediumAvatar user={visitor} rounded={true} />
      <div className="w-full flex flex-row pl-1 bg-gray-200 h-[2rem]">
        <textarea
          id="InputNewComment"
          onKeyDown={(e) => {
            e.key === "Enter" && postComment();
          }}
          ref={newCommentsRef}
          className="w-full h-full bg-transparent outline-none flex py-1.5 resize-none placeholder:font-normal placeholder:text-md"
          placeholder={
            visitor?.email ? "Sign new comment" : "Sign in for send new comments"
          }
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
      <PrettyCustomSizeAvatar
        avatar={{
          data: authorReply?.avatar?.data,
          contentType: authorReply?.avatar?.contentType,
        }}
        size={2.75}
      />
      <div className="w-full flex flex-row pl-1 bg-gray-200 h-[2rem]">
        <textarea
          id="InputNewComment"
          onKeyDown={(e) => {
            e.key === "Enter" && postReply();
          }}
          ref={newReplyRef}
          className="w-full h-full bg-transparent outline-none flex py-1.5 resize-none placeholder:font-normal placeholder:text-md"
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

export { SendComment, SendReply };
