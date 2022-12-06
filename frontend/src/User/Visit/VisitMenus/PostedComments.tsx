import React, { useEffect, useState } from "react";
import { CommentDto } from "../../../Api/Comment/dtos/commentDto";
import { AccountAPI } from "../../../Api/User/AccountApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";

const PostedComments: React.FC<{ user: UserDto }> = ({ user }) => {
  const [postedComments, setPostedComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    (async () => {
      setPostedComments(
        await AccountAPI.GetUsersPostedComments(user?.username)
      );
    })();
  }, []);

  return (
    <div>
      {postedComments.length > 0 && (
        <div className="">
          <div className="space-y-5">
            {postedComments.map((comment: CommentDto, commentIndex: number) => (
              <div className="" key={commentIndex}>
                {comment.comment}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedComments;
