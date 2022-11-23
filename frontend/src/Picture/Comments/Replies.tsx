import React, { useEffect, useState } from "react";
import { CommentAPI } from "../../Api/Pic/CommentApi";
import { CommentDto } from "../../Api/Pic/PicDtos/commentDto";
import { PrettyMediumAvatar } from "../../components/Prettys/PrettyComponents";

const Replies: React.FC<{ comment: CommentDto }> = ({ comment }) => {
  const [replies, setReplies] = useState<CommentDto[]>();

  const getReplies = async () => {
    setReplies(await CommentAPI.getCommentReplies(comment));
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <div className="w-full">
      {replies && replies?.length > 0 && (
        <div className="w-full pl-10">
          <div className="w-full flex flex-col space-y-2">
            {replies?.map((reply: CommentDto, replyIndex: any) => (
              <div
                key={replyIndex}
                className="w-full h-full flex flex-row space-x-3"
              >
                <PrettyMediumAvatar user={reply.author} rounded={true} />
                <div className="w-full flex flex-col">
                  <div className="w-full h-full flex-row">
                    <a
                      href={`/user/${reply?.author?.username}`}
                      className="font-bold hover:underline select-none"
                    >
                      {reply?.author.username}
                    </a>
                    <span className="w-full font-normal break-all pl-2">
                      {reply?.comment}
                    </span>
                    <div className="w-full flex justify-between">
                      <div className="flex flex-row space-x-1">
                        <p className="text-sm text-gray-400">1h</p>
                        <p className="text-sm font-bold cursor-pointer">♥</p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Replies;
