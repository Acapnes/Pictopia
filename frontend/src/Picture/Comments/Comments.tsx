import { CommentDto } from "../../Api/Comment/Comment/commentDto";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyComponents";
import Replies from "./Replies";

const Comments: React.FC<{ comments: CommentDto[] }> = ({ comments }) => {
  return (
    <div className="w-full max-h-[30rem] overflow-auto py-2 scrollbar-hide text-gray-200">
      {comments.length ? (
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
                      <p className="text-sm font-bold text-pretty-pink hover:text-pretty-rough-pink duration-200 cursor-pointer">
                        Reply
                      </p>
                      <p className="text-sm font-bold cursor-pointer">♥</p>
                    </div>
                    <div></div>
                  </div>
                </div>
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
