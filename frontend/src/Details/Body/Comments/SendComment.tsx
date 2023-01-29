import React, { useRef } from "react";
import { CommentAPI } from "../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../Api/Comment/commentDtos";
import { PicDto } from "../../../Api/Pic/picDtos";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { PrettyCustomSizeAvatar } from "../../../components/Prettys/PrettyComponents";
import {
  PrettyEmojiIcon,
  PrettyPictureIcon,
  PrettySend,
} from "../../../components/Prettys/PrettyIcons";
import {
  useAlertStore,
  usePictureCommentStore,
} from "../../../components/Zustand";

const SendComment: React.FC<{
  visitor: UserDto;
  picture: PicDto;
}> = ({ picture, visitor }) => {
  const setToastState = useAlertStore((state: any) => state.setToastState);
  const newCommentsRef = useRef<HTMLTextAreaElement>(null);

  const setComments = usePictureCommentStore((state: any) => state.setComments);

  const postComment = async () => {
    if (visitor?.email) {
      await CommentAPI.postCommentToPicture(
        window.localStorage.getItem("access_token")!,
        {
          comment: newCommentsRef?.current?.value!,
          destPicture: picture?._id,
          creationDate: new Date(),
        }
      ).then(async () => {
        newCommentsRef.current!.value = "";
        setComments(await CommentAPI.getCommentsOfPicture(picture?._id));
      });
    } else {
      await setToastState("Please login before");
    }
  };

  return (
    <div className="flex flex-row space-x-2 text-black text-sm">
      <PrettyCustomSizeAvatar
        avatar={{
          data: visitor?.avatar?.data,
          contentType: visitor?.avatar?.contentType,
        }}
        size={3.25}
      />
      <div className="w-full flex flex-col">
        <textarea
          id="InputNewComment"
          onKeyDown={(e) => {
            e.key === "Enter" && postComment();
          }}
          ref={newCommentsRef}
          className="w-full h-fit bg-2xl-extra-light-soft-black outline-none text-gray-200
          flex resize-none placeholder:font-normal placeholder:text-md rounded-sm p-1.5"
          placeholder={
            visitor?.email
              ? "Sign new comment"
              : "Sign in for send new comments"
          }
        />
        <div className="w-full flex items-center justify-between pt-1.5 pl-2">
          <div className="flex flex-row space-x-4">
            <button>
              <PrettyEmojiIcon fill="white" />
            </button>
            <button>
              <PrettyPictureIcon fill="white" size={18} />
            </button>
          </div>
          <div className="flex flex-row space-x-2">
            <button onClick={() => postComment()}>
              <p className="duration-300 text-gray-200 hover:text-pretty-rough-pink font-bold">
                Cancel
              </p>
            </button>
            <button
              onClick={() => postComment()}
              className="flex flex-row space-x-1.5 bg-opacity-90 bg-pretty-pink p-1.5 rounded-sm duration-300 hover:bg-pretty-rough-pink hover:bg-opacity-90"
            >
              <p className="text-gray-200 font-bold">Send</p>
              <PrettySend size={20} fill="white" />
            </button>
          </div>
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

  const setReplies = usePictureCommentStore((state: any) => state.setReplies);

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
        setReplies(await CommentAPI.getCommentReplies(parentComment));
        setsendReplyViewState(false);
      });
    }
  };

  return (
    <div className="h-fit flex flex-row space-x-2 text-black text-xs">
      <PrettyCustomSizeAvatar
        avatar={{
          data: authorReply?.avatar?.data,
          contentType: authorReply?.avatar?.contentType,
        }}
        size={2.75}
      />
      <div className="w-full flex flex-col">
        <textarea
          id="InputNewComment"
          onKeyDown={(e) => {
            e.key === "Enter" && postReply();
          }}
          ref={newReplyRef}
          className="w-full h-[2rem] bg-2xl-extra-light-soft-black outline-none text-gray-200
    flex resize-none placeholder:font-normal placeholder:text-md rounded-sm p-1.5"
          placeholder={
            authorReply?.email
              ? "Sign new comment"
              : "Sign in for send new comments"
          }
        />
        <div className="w-full flex items-center justify-between pt-1.5 pl-2">
          <div className="flex flex-row space-x-4">
            <button>
              <PrettyEmojiIcon fill="white" size={16} />
            </button>
            <button>
              <PrettyPictureIcon fill="white" size={16} />
            </button>
          </div>
          <div className="flex flex-row space-x-2">
            <button onClick={() => postReply()}>
              <p className="duration-300 text-gray-200 hover:text-pretty-rough-pink font-bold">
                Cancel
              </p>
            </button>
            <button
              onClick={() => postReply()}
              className="flex flex-row space-x-1.5 bg-opacity-90 bg-pretty-pink p-1.5 rounded-sm duration-300 hover:bg-pretty-rough-pink hover:bg-opacity-90"
            >
              <p className="text-gray-200 font-bold">Send</p>
              <PrettySend size={16} fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SendComment, SendReply };
