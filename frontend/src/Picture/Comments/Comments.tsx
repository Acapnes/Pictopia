import { CommentDto } from "../../Api/Comment/dtos/commentDto";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyElements";
import { usePictureCommentStore } from "../../components/Zustand/store";
import Replies from "./Replies";
import SendReply from "./SendReply";

const Comments: React.FC<{
  comments: CommentDto[];
  author: UserDto;
  picture: PicDto;
}> = ({ comments, author, picture }) => {
  const setsendReplyViewState = usePictureCommentStore(
    (state: any) => state.setsendReplyViewState
  );
  const sendReplyViewState = usePictureCommentStore(
    (state: any) => state.sendReplyViewState
  );

  return (
    <div className="w-full max-h-[30rem] overflow-auto py-2 scrollbar-hide text-gray-200">
      {comments.length > 0 ? (
        <div className="w-full flex flex-col space-y-5">
          {comments?.map((_comment: CommentDto, _commentIndex: any) => (
            <div
              key={_commentIndex}
              className="w-full h-full flex flex-row space-x-3"
            >
              <PrettyMediumAvatar user={_comment.author} rounded={true} />
              <div className="w-full flex flex-col space-y-3">
                <div className="w-full h-full flex-row">
                  <a
                    href={`/user/${_comment?.author?.username}`}
                    className="font-bold hover:underline select-none"
                  >
                    {_comment?.author.username}
                  </a>
                  <span className="w-full font-normal break-all pl-2">
                    {_comment?.comment}
                  </span>
                  <div className="w-full flex justify-between">
                    <div className="flex flex-row space-x-1">
                      <p className="text-sm text-gray-400">1h</p>
                      <p
                        onClick={() => setsendReplyViewState(_commentIndex)}
                        className="text-sm font-bold text-pretty-pink hover:text-pretty-rough-pink duration-200 cursor-pointer"
                      >
                        Reply
                      </p>
                      <p className="text-sm font-bold cursor-pointer">♥</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                {sendReplyViewState === _commentIndex && (
                  <SendReply
                    authorReply={author}
                    parentComment={_comment}
                    picture={picture}
                  />
                )}
                <Replies comment={_comment} />
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
