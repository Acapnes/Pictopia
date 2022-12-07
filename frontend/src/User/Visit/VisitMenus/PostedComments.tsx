import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { CommentDto } from "../../../Api/Comment/dtos/commentDto";
import { AccountAPI } from "../../../Api/User/AccountApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { PrettyRainbowDiv } from "../../../components/Prettys/PrettyComponents";
import { PrettySmallAvatar } from "../../../components/Prettys/PrettyElements";
import Replies from "../../../Picture/Comments/Replies";

const PostedComments: React.FC<{ user: UserDto; params: any }> = ({
  user,
  params,
}) => {
  const [postedComments, setPostedComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    (async () => {
      setPostedComments(await AccountAPI.GetUsersPostedComments(params.id));
    })();
  }, []);

  return (
    <div className="min-h-screen">
      {postedComments.length > 0 && (
        <div className="flex flex-col items-center px-2 pb-2">
          <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
            {postedComments.map((comment: CommentDto, commentIndex: number) => (
              <PrettyRainbowDiv key={commentIndex}>
                <div className="w-full h-full flex flex-col space-x-2 items-center overflow-hidden text-gray-200">
                  <div className="w-fit h-fit border-[1.5px] border-pretty-rough-pink border-opacity-40 rounded-sm">
                    <img
                      src={`data:${comment?.destPicture?.picture_file?.contentType};base64,${comment?.destPicture?.picture_file?.data}`}
                      alt=""
                      className="rounded-sm max-h-[25vh]"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-5">
                    <div className="w-full h-full flex flex-row space-x-3">
                      <div className="w-full flex flex-col space-y-3">
                        <div className="w-full h-full flex flex-row space-x-1">
                          <PrettySmallAvatar
                            user={comment?.author}
                            rounded={true}
                          />
                          <div className="pt-1.5">
                            <span className="font-bold hover:underline select-none text-pretty-rough-pink">
                              {comment?.author?.name}
                            </span>
                            <span className="w-full font-normal break-all pl-2">
                              {comment?.comment}
                            </span>
                          </div>
                        </div>
                        <div className="pl-5">
                          <Replies small comment={comment} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PrettyRainbowDiv>
            ))}
          </Masonry>
        </div>
      )}
    </div>
  );
};

export default PostedComments;
