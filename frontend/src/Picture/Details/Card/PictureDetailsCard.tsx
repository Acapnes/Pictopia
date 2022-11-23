import { useEffect, useState } from "react";
import { CommentAPI } from "../../../Api/Pic/CommentApi";
import { CommentDto } from "../../../Api/Pic/PicDtos/commentDto";
import { PicDto } from "../../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../../Api/User/UserApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../../../Api/UtilsDtos/ReturnFuncDto";
import { MultiFuncs } from "../../../components/Functions/MultipleFuncs";
import {
  PrettyCommentsButton,
  PrettyReportButton,
  PrettySavePicture,
  PrettySend,
  PrettyShare,
} from "../../../components/Prettys/PrettyButtons";
import {
  PrettyLargeAvatar,
  PrettyMediumAvatar,
  PrettySendCommentOrReply,
} from "../../../components/Prettys/PrettyComponents";
import CustomToast from "../../../components/Views/CustomToast";
import Comments from "../../Comments/Comments";

const PictureDetailsCard: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const [commentsStatus, setCommentsStatus] = useState(false);
  const [comments, setComments] = useState<CommentDto[]>([]);

  const [newCommentsComment, setNewCommentsComment] = useState(String);
  const [customToastResult, setCustomToastResult] = useState<ReturnFuncDto>();
  const [newCommentAuthorCredentials, setNewCommentAuthorCredentials] =
    useState<UserDto>(Object);

  const getCommentsById = async () => {
    setComments(
      await CommentAPI.getCommentsOfPicture(await MultiFuncs.UrlParam())
    );
  };

  const postComment = async () => {
    if (window.localStorage.getItem("access_token")) {
      await CommentAPI.postCommentToPicture(
        window.localStorage.getItem("access_token")!,
        {
          comment: newCommentsComment,
          destPicture: picture?._id,
        }
      ).then(() => getCommentsById());
    }
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
    <div className="w-full lg:max-w-[60vw] 3xl:max-w-[50vw] p-[0.2rem] mb-10 flex flex-col shadow-3xl bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
      <div id="DetailsCustomToast">
        {customToastResult && <CustomToast result={customToastResult} />}
      </div>

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
        <div className="h-full flex flex-col justify-between items-end space-y-3">
          <PrettySavePicture
            picture={picture}
            setCustomToastResult={setCustomToastResult}
          />
          <PrettyShare picture={picture} />
          <PrettyReportButton />
        </div>
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

export default PictureDetailsCard;
