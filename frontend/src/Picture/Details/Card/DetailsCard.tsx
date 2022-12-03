import { useEffect, useState } from "react";
import { CommentAPI } from "../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../Api/Comment/Comment/commentDto";
import { PicDto } from "../../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../../Api/User/UserApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../../../components/Functions/MultipleFuncs";
import { PrettyCommentsButton } from "../../../components/Prettys/PrettyButtons";
import { PrettyLargeAvatar } from "../../../components/Prettys/PrettyComponents";
import Comments from "../../Comments/Comments";
import CardOptions from "./components/CardOptions";
import PrettySendCommentOrReply from "../../Comments/SendComment";

const DetailsCard: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const [commentsStatus, setCommentsStatus] = useState(false);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newCommentAuthorCredentials, setNewCommentAuthorCredentials] =
    useState<UserDto>(Object);

  const getCommentsById = async () => {
    setComments(
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
      <div className="h-full flex flex-row justify-between space-x-3 bg-soft-black bg-opacity-95 p-5 text-gray-200 ">
        <div className="flex flex-col space-y-2 w-full h-full">
          <PrettyLargeAvatar user={picture.authorPic} />
          <p className="w-fullh-full font-bold text-2xl">{picture?.title}</p>
          <div className="max-h-[35vh] py-3 break-all overflow-y-auto scrollbar-hide">
            {picture.description}
          </div>
          <div className="h-fit w-full items-start ">
            <button onClick={() => setCommentsStatus(!commentsStatus)}>
              <PrettyCommentsButton
                state={commentsStatus}
                length={comments.length}
              />
            </button>
          </div>
        </div>
        <CardOptions picture={picture} />
      </div>
      <div className="bg-soft-black bg-opacity-95 px-5">
        <div className={`${commentsStatus ? "block" : "hidden"} `}>
          <PrettySendCommentOrReply
            getCommentsById={getCommentsById}
            author={newCommentAuthorCredentials}
            picture={picture}
          />
        </div>
        <div className={`${commentsStatus ? "block" : "hidden"} pb-5 `}>
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
