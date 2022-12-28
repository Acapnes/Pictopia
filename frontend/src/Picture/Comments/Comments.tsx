import { CommentAPI } from "../../Api/Comment/CommentApi";
import { CommentDto } from "../../Api/Comment/commentDtos";
import { PicDto } from "../../Api/Pic/picDtos";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../../Api/Utils/UtilsDtos";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyElements";
import { PrettyTrashIcon } from "../../components/Prettys/PrettyIcons";
import {
  usePictureCommentStore,
  useToastStore,
} from "../../components/Zustand/store";
import Replies from "./Replies";
import { SendReply } from "./SendComment";

const Comments: React.FC<{
  comments: CommentDto[];
  visitor: UserDto;
  picture: PicDto;
}> = ({ comments, visitor, picture }) => {
  const setsendReplyViewState = usePictureCommentStore(
    (state: any) => state.setsendReplyViewState
  );
  
  const sendReplyViewState = usePictureCommentStore(
    (state: any) => state.sendReplyViewState
  );

  return (
    <div className="w-full max-h-[30rem] overflow-auto py-2 scrollbar-hide text-gray-200">
      {comments?.length > 0 ? (
        <div className="w-full flex flex-col space-y-5">
          {comments?.map((_comment: CommentDto, _commentIndex: number) => (
            <div
              key={_commentIndex}
              className="w-full h-full flex flex-row space-x-3"
            >
              <PrettyMediumAvatar user={_comment?.author!} rounded={true} />
              <div className="w-full flex flex-col space-y-3">
                <div className="w-full h-full flex-row">
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
                    <p
                      onClick={() => setsendReplyViewState(_commentIndex)}
                      className="text-sm font-bold text-pretty-pink hover:text-pretty-rough-pink duration-200 cursor-pointer"
                    >
                      Reply
                    </p>
                    <p className="text-sm font-bold cursor-pointer">♥</p>
                    <CommentAuthorEdit
                      visitor={visitor}
                      authorComment={_comment?.author!}
                      destPicture={picture?._id!}
                      commentId={_comment?._id!}
                    />
                  </div>
                </div>
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
      ) : (
        <div className="w-full text-center text-gray-500 font-semibold">
          No Comments Avaliable
        </div>
      )}
    </div>
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
  
  const setToastState = useToastStore((state: any) => state.setToastState);

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
