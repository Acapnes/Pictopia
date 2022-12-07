import React, { useEffect, useState } from "react";
import { CommentAPI } from "../../Api/Comment/CommentApi";
import { CommentDto } from "../../Api/Comment/dtos/commentDto";
import {
  PrettyMediumAvatar,
  PrettySmallAvatar,
} from "../../components/Prettys/PrettyElements";
import { usePictureCommentStore } from "../../components/Zustand/store";

const Replies: React.FC<{
  comment: CommentDto;
  options?: boolean;
  small?: boolean;
}> = ({ comment, options, small }) => {
  const sendReplyViewState = usePictureCommentStore(
    (state: any) => state.sendReplyViewState
  );
  const [replies, setReplies] = useState<CommentDto[]>();

  const getReplies = async () => {
    setReplies(await CommentAPI.getCommentReplies(comment));
  };

  useEffect(() => {
    getReplies();
  }, [sendReplyViewState]);

  return (
    <div className="w-full">
      {replies && replies?.length > 0 && (
        <div className="w-full">
          <div className="w-full flex flex-col space-y-2">
            {replies?.map((reply: CommentDto, replyIndex: any) => (
              <div
                key={replyIndex}
                className="w-full h-full flex flex-row space-x-3"
              >
                {small ? (
                  <PrettySmallAvatar user={reply.author} rounded={true} />
                ) : (
                  <PrettyMediumAvatar user={reply.author} rounded={true} />
                )}

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
                    {options && (
                      <div className="w-full flex justify-between">
                        <div className="flex flex-row space-x-1">
                          <p className="text-sm text-gray-400">1h</p>
                          <p className="text-sm font-bold cursor-pointer">♥</p>
                        </div>
                        <div></div>
                      </div>
                    )}
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
