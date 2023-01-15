import { useEffect, useState } from "react";
import { CommentAPI } from "../../../Api/Comment/CommentApi";
import { CommentDto } from "../../../Api/Comment/commentDtos";
import { PicDto } from "../../../Api/Pic/picDtos";
import { UserAPI } from "../../../Api/User/UserApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../../components/Prettys/PrettyComponents";
import {
  PrettyLargeAvatar,
  PrettyRotatingArrow,
} from "../../../components/Prettys/PrettyElements";
import Comments from "../Comments/Comments";
import { CardOptions } from "./CardOptions";
import { usePictureCommentStore } from "../../../components/Zustand/store";
import { useParams } from "react-router-dom";
import { CategoryShowList } from "../../Upload/components/Categories";
import { SendComment } from "../Comments/SendComment";

const DetailsCard: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const params = useParams<any>();
  const [commentsStatus, setCommentsStatus] = useState(false);
  const [detailVisitor, setDetailVisitor] = useState<UserDto>(Object);

  const setCurrentComments = usePictureCommentStore(
    (state: any) => state.setCurrentComments
  );

  const currentComments = usePictureCommentStore<CommentDto[]>(
    (state: any) => state.currentComments
  );

  const getCommentsById = async () => {
    setCurrentComments(
      await CommentAPI.getCommentsOfPicture(params.id?.toString()!)
    );
  };

  const fetchUserCredentialsForNewComment = async () => {
    if (window.localStorage.getItem("access_token"))
      setDetailVisitor(
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
    <div className="w-full lg:max-w-[60vw] 3xl:max-w-[50vw] mb-10 flex flex-col space-y-1">
      <CategoryShowList categoryArray={picture?.categories} />
      <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5">
        <div className="h-full flex flex-row justify-between space-x-4 bg-soft-black bg-opacity-95 p-5 text-gray-200 ">
          <div className="flex flex-col space-y-2 w-full h-full">
            <div className="flex flex-row space-x-4 items-center">
              <div className="items-center">
                <PrettyLargeAvatar user={picture.authorPic} />
              </div>
              <div className="w-full flex flex-col ">
                <p className="w-full font-bold text-2xl max-h-[12vh] break-all overflow-y-auto scrollbar-hide">
                  {picture?.title}
                </p>
                {picture?.description?.length <= 50 && (
                  <div className="max-h-[35vh] py-3 break-all overflow-y-auto scrollbar-hide">
                    <p>{picture?.description}</p>
                  </div>
                )}
              </div>
            </div>
            {picture?.description?.length > 50 && (
              <div className="max-h-[35vh] break-all overflow-y-auto scrollbar-hide">
                <p>{picture?.description}</p>
              </div>
            )}
            <HashTags hashTags={picture?.hashTags} />
            <div className="h-fit w-full flex flex-col-reverse gap-2 md:flex-row items-start justify-between">
              <PrettyRainbow
                advStyle="rounded-sm min-w-[8rem]"
                advChildStyle="py-1.5 px-2.5 rounded-sm text-sm min-w-[7rem]"
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
              <CardOptions picture={picture} visitor={detailVisitor} />
            </div>
          </div>
        </div>
        <div className="bg-soft-black bg-opacity-95 px-5">
          <div className={`${commentsStatus ? "block" : "hidden"} `}>
            <SendComment
              getCommentsById={getCommentsById}
              author={detailVisitor}
              picture={picture}
            />
          </div>
          <div className={`${commentsStatus ? "block" : "hidden"} pb-5 `}>
            <Comments
              comments={currentComments}
              visitor={detailVisitor}
              picture={picture}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;

const HashTags: React.FC<{ hashTags: PicDto["hashTags"] }> = ({ hashTags }) => {
  return (
    <>
      {hashTags?.length > 0 && (
        <div className="w-full flex flex-row space-x-2 py-2 overflow-x-scroll scrollbar-hide">
          {hashTags?.map((hashtag: string, hashIndex: number) => (
            <div key={hashIndex}>
              <a
                href={`/search/tags/${hashtag.slice(1, hashtag.length)}`}
                className="rounded-md border-[1px] border-pretty-rough-pink border-opacity-70 px-2 py-1 text-pretty-pink text-sm"
              >
                {hashtag}
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
