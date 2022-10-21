import { useEffect, useState } from "react";
import { PicAPI } from "../Api/PicApi";
import { CommentDto } from "../Api/PicDtos/commentDto";

import {
  PrettyReply,
  PrettyThumbsDown,
  PrettyThumbsUp,
} from "../components/PrettyButtons";


const Comments = () => {
  const [comments, setComments] = useState<CommentDto[]>([]);

  const getCommentsById = async () => {
    const urlParam =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    setComments(await PicAPI.getCommentsOfPicture(urlParam));
  };

  useEffect(() => {
    getCommentsById();
  }, []);

  return (
    <div className="w-full min-h-24 max-h-[24rem] overflow-auto py-2">
      {comments.length ? (
        <div className="w-full flex flex-col space-y-5 text-black ">
          {comments.map((_comment, _commentIndex) => (
            <div
              key={_commentIndex}
              className="w-full h-full flex flex-row space-x-3 pr-2"
            >
              <div className="flex flex-col">
                <a
                  href="#_"
                  className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[5rem] max-h-[5rem]"
                >
                  <img
                    src={`data:${_comment?.author?.avatar?.contentType};base64,${_comment?.author?.avatar?.data}`}
                    alt=""
                    className="rounded-full w-full h-full object-cover p-[0.2rem] min-w-[5rem]"
                  />
                </a>
              </div>

              <div className="w-full h-full flex flex-col space-y-2">
                <div className="w-full flex items-center">
                  <span className="font-bold">{_comment?.author.username}</span>
                </div>
                <div className="h-full w-full flex items-center break-all">
                  <span className="font-normal">{_comment?.comment}</span>
                </div>
                <div className="w-full flex justify-between ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    <button>
                      <PrettyThumbsUp />
                    </button>
                    <button>
                      <PrettyThumbsDown />
                    </button>
                  </div>
                  <button className="flex items-start">
                    <PrettyReply />
                  </button>
                </div>
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
