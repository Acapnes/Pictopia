import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentAPI } from "../../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../../Api/Comment/commentDtos";
import { PicDto } from "../../../../Api/Pic/picDtos";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../../../../Api/Utils/UtilsDtos";
import { PrettyCustomSizeAvatar } from "../../../../components/Prettys/PrettyElements";
import { PrettyTrashIcon } from "../../../../components/Prettys/PrettyIcons";
import {
  useAlertStore,
  usePictureCommentStore,
} from "../../../../components/Zustand";
import { SendReply } from "./SendComment";

const Comments: React.FC<{
  visitor: UserDto;
  picture: PicDto;
}> = ({ visitor, picture }) => {
  const setsendReplyViewState = usePictureCommentStore(
    (state: any) => state.setsendReplyViewState
  );

  const sendReplyViewState = usePictureCommentStore(
    (state: any) => state.sendReplyViewState
  );

  const setComments = usePictureCommentStore((state: any) => state.setComments);

  const comments = usePictureCommentStore<CommentDto[]>(
    (state: any) => state.comments
  );

  useEffect(() => {
    (async () => {
      setComments(
        await CommentAPI.getCommentsOfPicture(params.id?.toString()!)
      );
    })();
  }, []);

  const params = useParams<any>();

  return (
    <>
      {comments?.length > 0 && (
        <div className="w-full flex items-center justify-center overflow-auto scrollbar-hide text-sm">
          <div className="w-[80%] flex flex-col space-y-4">
            {comments?.map((_comment: CommentDto, _commentIndex: number) => (
              <div key={_commentIndex} className="flex flex-col space-y-2.5">
                <div className="w-full h-full flex flex-row space-x-3">
                  <PrettyCustomSizeAvatar
                    avatar={{
                      data: _comment?.author?.avatar?.data!,
                      contentType: _comment?.author?.avatar?.contentType!,
                    }}
                    size={3.75}
                  />
                  <div className="w-full flex flex-col justify-center space-y-3">
                    <div className="w-full flex-row">
                      <a
                        href={`/user/${_comment?.author?.username}`}
                        className="font-bold hover:underline select-none"
                      >
                        {_comment?.author?.username}
                      </a>
                      <span className="w-full font-normal break-all pl-2">
                        {_comment?.comment}
                      </span>
                      <div className="flex flex-row space-x-2.5 items-center">
                        <p className="text-sm text-gray-400">1h</p>
                        {visitor?.email && (
                          <div className="flex flex-row space-x-2.5">
                            <p
                              onClick={() =>
                                setsendReplyViewState(_commentIndex)
                              }
                              className="text-sm font-bold text-pretty-pink hover:text-pretty-rough-pink duration-200 cursor-pointer"
                            >
                              Reply
                            </p>
                            <p className="text-sm font-bold cursor-pointer">
                              ♥
                            </p>
                          </div>
                        )}
                        <CommentAuthorEdit
                          visitor={visitor}
                          authorComment={_comment?.author!}
                          destPicture={picture?._id!}
                          commentId={_comment?._id!}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 pl-10">
                  {sendReplyViewState === _commentIndex && (
                    <SendReply
                      authorReply={visitor}
                      parentComment={_comment}
                      picture={picture}
                    />
                  )}
                  <Replies
                    options
                    comment={_comment}
                    visitor={visitor}
                    destPicture={picture?._id!}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;

export { CommentAuthorEdit };

const CommentAuthorEdit: React.FC<{
  visitor: UserDto;
  authorComment: UserDto;
  destPicture: string;
  commentId: string;
}> = ({ visitor, authorComment, destPicture, commentId }) => {
  const setToastState = useAlertStore((state: any) => state.setToastState);

  return (
    <>
      {visitor?._id === authorComment?._id && (
        <button
          onClick={() => {
            CommentAPI.deleteCommentOrReply(
              window.localStorage.getItem("access_token")!,
              {
                _id: commentId,
                destPicture: destPicture,
              }
            ).then(
              async (RegisterResp: ReturnFuncDto) =>
                await setToastState(RegisterResp.message)
            );
          }}
        >
          <PrettyTrashIcon size={12} fill="rgb(160, 160, 160)" />
        </button>
      )}
    </>
  );
};

const Replies: React.FC<{
  destPicture?: PicDto["_id"];
  comment: CommentDto;
  visitor?: UserDto;
  options?: boolean;
}> = ({ comment, options, visitor, destPicture }) => {
  const sendReplyViewState = usePictureCommentStore(
    (state: any) => state.sendReplyViewState
  );
  const [replies, setReplies] = useState<CommentDto[]>();

  const currentComments = usePictureCommentStore<CommentDto[]>(
    (state: any) => state.currentComments
  );

  useEffect(() => {
    (async () => {
      setReplies(await CommentAPI.getCommentReplies(comment));
    })();
  }, [sendReplyViewState, currentComments]);

  return (
    <div className="w-full">
      {replies && replies?.length > 0 && (
        <div className="w-full flex flex-col space-y-2">
          {replies?.map((reply: CommentDto, replyIndex: number) => (
            <div
              key={replyIndex}
              className="w-full h-full flex flex-row space-x-3"
            >
              <PrettyCustomSizeAvatar
                avatar={{
                  data: reply?.author?.avatar?.data!,
                  contentType: reply?.author?.avatar?.contentType!,
                }}
                size={2.5}
              />

              <div className="w-full flex flex-col">
                <div className="w-full h-full flex-row">
                  <a
                    href={`/user/${reply?.author?.username}`}
                    className="font-bold hover:underline select-none"
                  >
                    {reply?.author?.username}
                  </a>
                  <span className="w-full font-normal break-all pl-2">
                    {reply?.comment}
                  </span>
                  {options && (
                    <div className="flex flex-row space-x-1">
                      <p className="text-sm text-gray-400">1h</p>
                      {visitor && (
                        <CommentAuthorEdit
                          visitor={visitor}
                          authorComment={reply?.author!}
                          destPicture={destPicture!}
                          commentId={reply?._id!}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
