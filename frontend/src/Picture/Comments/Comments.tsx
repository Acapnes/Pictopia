import { PrettyReply } from "../../components/Prettys/PrettyButtons";
import { PrettyProfileIcon } from "../../components/Prettys/PrettyIcons";

const Comments = (props: any) => {
  return (
    <div className="w-full min-h-24 max-h-[22rem] overflow-auto py-2 scrollbar-hide text-gray-200">
      {props?.comments.length ? (
        <div className="w-full flex flex-col space-y-5">
          {props?.comments?.map((_comment: any, _commentIndex: any) => (
            <div
              key={_commentIndex}
              className="w-full h-full flex flex-row space-x-3 pr-2"
            >
              {_comment?.author?.avatar?.contentType ||
              _comment?.author?.avatar?.data ? (
                <div className="flex flex-col">
                  <a
                    href="#_"
                    className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[4rem] max-h-[4rem]"
                  >
                    <img
                      src={`data:${_comment?.author?.avatar?.contentType};base64,${_comment?.author?.avatar?.data}`}
                      alt=""
                      className="rounded-full w-full h-full object-cover p-[0.2rem] min-w-[4rem]"
                    />
                  </a>
                </div>
              ) : (
                <a
                  href="#_"
                  className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem] h-[4rem] relative p-[0.2rem]"
                >
                  <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
                    <PrettyProfileIcon size={32} fill={"white"} />
                  </div>
                </a>
              )}

              <div className="w-full h-full flex flex-col space-y-2">
                <div className="w-full flex items-center">
                  <span className="font-bold">{_comment?.author.username}</span>
                </div>
                <div className="h-full w-full flex items-center break-all">
                  <span className="font-normal">{_comment?.comment}</span>
                </div>
                <div className="w-full flex justify-between ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {/* <button>
                      <PrettyThumbsUpButton />
                    </button>
                    <button>
                      <PrettyThumbsDownButton />
                    </button> */}
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
