import { useEffect, useState } from "react";
import { CommentAPI } from "../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../Api/Comment/Comment/commentDto";
import { PicDto } from "../../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../../Api/User/UserApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../../../components/Functions/MultipleFuncs";
import { PrettyRainbow } from "../../../components/Prettys/PrettyComponents";
import {
  PrettyLargeAvatar,
  PrettyRotatingArrow,
} from "../../../components/Prettys/PrettyElements";
import Comments from "../../Comments/Comments";
import CardOptions from "./components/CardOptions";
import SendComment from "../../Comments/SendComment";
import { usePictureCommentStore } from "../../../components/Zustand/store";

const DetailsCard: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const [commentsStatus, setCommentsStatus] = useState(false);
  const [newCommentAuthorCredentials, setNewCommentAuthorCredentials] = useState<UserDto>(Object);

  const setCurrentComments = usePictureCommentStore(
    (state: any) => state.setCurrentComments
  );
  const currentComments = usePictureCommentStore<CommentDto[]>(
    (state: any) => state.currentComments
  );

  const getCommentsById = async () => {
    setCurrentComments(
      await CommentAPI.getCommentsOfPicture(await MultiFuncs.UrlParam())
    );
  };

  const fetchUserCredentialsForNewComment = async () => {
    if (window.localStorage.getItem("access_token"))
      setNewCommentAuthorCredentials(
        await UserAPI.fetchUserCredentials(
          window.localStorage.getItem("access_token")!
        )
      );
  };

  useEffect(() => {
    getCommentsById();
    fetchUserCredentialsForNewComment();
  }, []);

  return (
    <div className="w-full lg:max-w-[60vw] 3xl:max-w-[50vw] p-0.5 mb-10 flex flex-col shadow-3xl bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
      <div className="h-full flex flex-row justify-between space-x-4 bg-soft-black bg-opacity-95 p-5 text-gray-200 ">
        <div className="flex flex-col space-y-2 w-full h-full">
          <div className="flex flex-row space-x-4 items-center">
            <div className="items-center">
              <PrettyLargeAvatar user={picture.authorPic} />
            </div>
            <div className="flex flex-col">
              <p className="w-full font-bold text-2xl max-h-[12vh] break-all overflow-y-auto scrollbar-hide first-letter:uppercase">
                {picture?.title}
              </p>
              {picture?.description?.length <= 50 && (
                <div className="max-h-[35vh] py-3 break-all overflow-y-auto scrollbar-hide first-letter:uppercase">
                  <p>{picture?.description}</p>
                </div>
              )}
            </div>
          </div>
          {picture?.description?.length > 50 && (
            <div className="max-h-[35vh] py-3 break-all overflow-y-auto scrollbar-hide">
              <p>{picture?.description}</p>
            </div>
          )}

          <div className="h-fit w-full flex flex-row items-center justify-between pt-5">
            <PrettyRainbow
              advStyle="rounded-sm "
              advChildStyle="py-1.5 px-2.5 rounded-sm text-sm"
              onclick={() => setCommentsStatus(!commentsStatus)}
            >
              <div className="flex flex-row space-x-1 items-center">
                <span className="text-gray-200">
                  {currentComments.length ? currentComments.length : "0"}{" "}
                  Comments
                </span>
                <PrettyRotatingArrow state={commentsStatus} />
              </div>
            </PrettyRainbow>
            <CardOptions picture={picture} />
          </div>
        </div>
      </div>
      <div className="bg-soft-black bg-opacity-95 px-5">
        <div className={`${commentsStatus ? "block" : "hidden"} `}>
          <SendComment
            getCommentsById={getCommentsById}
            author={newCommentAuthorCredentials}
            picture={picture}
          />
        </div>
        <div className={`${commentsStatus ? "block" : "hidden"} pb-5 `}>
          <Comments
            comments={currentComments}
            author={newCommentAuthorCredentials}
            picture={picture}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
