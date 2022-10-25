import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PicAPI } from "../../Api/PicApi";
import { CommentDto } from "../../Api/PicDtos/commentDto";
import {
  PrettyCommentsButton,
  PrettyReportButton,
  PrettySavePicture,
  PrettyShare,
} from "../../components/PrettyButtons";
import { PrettyPictureAuthorAvatar } from "../../components/PrettyComponents";
import Comments from "../Comments";
import SignComment from "./SignComment";

const PictureDetailsCard = (props: any) => {
  const [commentsStatus, setCommentsStatus] = useState(false);

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
    <div className="w-full lg:max-w-[37vw] p-[0.2rem] mb-10 flex flex-col shadow-3xl bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
      <div className="h-full flex flex-row justify-between space-x-3 bg-soft-black bg-opacity-95 p-5 text-gray-200 ">
        <div className="flex flex-col space-y-2 w-full h-full">
          <Link to={"/user/"}>
            <PrettyPictureAuthorAvatar picture={props.picture} size={"6rem"} />
          </Link>

          <div className="w-full">
            <p className="h-full font-bold text-2xl">{props.picture?.title}</p>
          </div>

          <div className="w-full h-fit flex flex-col py-3">
          {/* border-b-[1px] border-[#fc1bcb] */}
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
          <PrettyShare />
          <PrettySavePicture />
          <PrettyReportButton />
        </div>
      </div>

      <div className="bg-soft-black bg-opacity-95 px-5">
        <div className={`${commentsStatus ? "block" : "hidden"} pb-5 `}>
          <SignComment />
        </div>
        <div className={`${commentsStatus ? "block" : "hidden"} pb-5 `}>
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default PictureDetailsCard;
