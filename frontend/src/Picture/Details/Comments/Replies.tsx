import React, { useEffect, useState } from "react";
import { CommentAPI } from "../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../Api/Comment/commentDtos";
import { PicDto } from "../../../Api/Pic/picDtos";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import {
  PrettyCustomSizeAvatar,
  PrettyMediumAvatar,
  PrettySmallAvatar,
} from "../../../components/Prettys/PrettyElements";
import { usePictureCommentStore } from "../../../components/Zustand/store";
import { CommentAuthorEdit } from "./Comments";

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
                size={3}
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

export default Replies;
