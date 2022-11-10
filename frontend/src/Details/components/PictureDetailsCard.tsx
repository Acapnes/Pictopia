import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CommentAPI } from "../../Api/Pic/CommentApi";
import { CommentDto } from "../../Api/Pic/PicDtos/commentDto";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import {
  PrettyCommentsButton,
  PrettyReportButton,
  PrettySavePicture,
  PrettySend,
  PrettyShare,
} from "../../components/Prettys/PrettyButtons";
import { PrettyPictureAuthorAvatar } from "../../components/Prettys/PrettyComponents";
import {
  PrettyProfileIcon,
  PrettyProfilePicture,
} from "../../components/Prettys/PrettyIcons";
import CustomToast from "../../components/Views/CustomToast";
import Comments from "../Comments";

const PictureDetailsCard = (props: any) => {
  const [commentsStatus, setCommentsStatus] = useState(false);
  const [comments, setComments] = useState<CommentDto[]>([]);

  const [newCommentsComment, setNewCommentsComment] = useState(String);
  const [customToastResult, setCustomToastResult] = useState<Object>();
  const [newCommentAuthorCredentials, setNewCommentAuthorCredentials] =
    useState<UserDto>(Object);

  const getCommentsById = async () => {
    const urlParam =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    setComments(await CommentAPI.getCommentsOfPicture(urlParam));
  };

  const postComment = async () => {
    if (window.localStorage.getItem("access_token")) {
      await CommentAPI.postCommentToPicture(
        window.localStorage.getItem("access_token")!,
        {
          comment: newCommentsComment,
          destPicture: props?.picture?._id,
        }
      ).then(() => {});
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

  const savePictureToAlbum = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.savedPicturesToUserAlbum(
        window.localStorage.getItem("access_token")!,
        props.picture
      ).then((resp) => {
        setCustomToastResult(resp);
        MultiFuncs.AlertTimer("DetailsCustomToast", true);
      });
    }
  };

  const sharePicture = async () => {
    if (navigator.share) {
      navigator.share({
        text: `Hey look at this! \n ${props?.picture?.title}`,
        url: "",
      });
    }
  };

  useEffect(() => {
    getCommentsById();
    fetchUserCredentialsForNewComment();
  }, []);

  return (
    <div className="w-full 3xl:max-w-[40vw] p-[0.2rem] mb-10 flex flex-col shadow-3xl bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
      <div id="DetailsCustomToast">
        {customToastResult && <CustomToast toastResult={customToastResult} />}
      </div>

      <div className="h-full flex flex-row justify-between space-x-3 bg-soft-black bg-opacity-95 p-5 text-gray-200 ">
        <div className="flex flex-col space-y-2 w-full h-full">
          {props?.picture?.authorPic?.avatar?.data ? (
            <Link to={"/user/"} className="rounded-full w-fit">
              <PrettyPictureAuthorAvatar
                picture={props.picture}
                size={"6rem"}
              />
            </Link>
          ) : (
            <Link to={"/user/"} className="w-fit rounded-full">
              <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem] h-[4rem] w-fit relative p-[0.2rem]">
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
                  <PrettyProfileIcon size={32} fill={"white"} />
                </div>
              </div>
            </Link>
          )}

          <div className="w-full">
            <p className="h-full font-bold text-2xl">{props.picture?.title}</p>
          </div>

          <div className="w-full h-fit flex flex-col py-3">
            <div className="max-h-[35vh] break-all overflow-y-auto scrollbar-hide">
              {props.picture.description}
            </div>
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
          <button
            onClick={() => savePictureToAlbum()}
            className="rounded-md flex items-center"
          >
            <PrettySavePicture />
          </button>
          <button
            onClick={() => sharePicture()}
            className="rounded-md flex items-center"
          >
            <PrettyShare />
          </button>
          <button className="rounded-md flex items-center">
            <PrettyReportButton />
          </button>
        </div>
      </div>

      <div className="bg-soft-black bg-opacity-95 px-5">
        <div className={`${commentsStatus ? "block" : "hidden"} `}>
          <div className="flex flex-row space-x-2">
            {newCommentAuthorCredentials?.avatar?.data ||
            newCommentAuthorCredentials?.avatar?.contentType ? (
              <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[4.5rem] h-[4.5rem]">
                <img
                  src={`data:${newCommentAuthorCredentials.avatar?.contentType};base64,${newCommentAuthorCredentials.avatar?.data}`}
                  alt=""
                  className="rounded-full h-[4.5rem] w-full object-cover p-[0.15rem]"
                />
              </div>
            ) : (
              <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[4rem] h-[4rem] relative p-[0.2rem]">
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
                  <PrettyProfileIcon size={32} fill={"white"} />
                </div>
              </div>
            )}

            <div className="w-full flex flex-col space-y-2">
              <div className="h-[3rem]">
                <textarea
                  id="InputNewComment"
                  onChange={(e) => setNewCommentsComment(e.target.value)}
                  className="w-[100%] h-full  outline-none flex px-1 py-1 resize-none border-2 placeholder:font-normal placeholder:text-md rounded-sm"
                  placeholder="Sıgn new comment"
                />
              </div>

              <div className="h-full flex justify-end">
                <button onClick={() => postComment()}>
                  <PrettySend />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${commentsStatus ? "block" : "hidden"} pb-5 `}>
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default PictureDetailsCard;
