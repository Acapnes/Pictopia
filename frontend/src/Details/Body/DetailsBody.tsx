import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PicAPI } from "../../Api/Pic/PicApi";
import { PicDto } from "../../Api/Pic/picDtos";
import { CategoryDto } from "../../Api/User/Category/categoryDtos";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import {
  PrettyCustomSizeAvatar,
  ScalePicture,
} from "../../components/Prettys/PrettyComponents";
import { PrettyCameraIcon } from "../../components/Prettys/PrettyIcons";
import { CardOptions } from "./CardOptions";
import Comments from "./Comments/Comments";
import { SendComment } from "./Comments/SendComment";

const DetailsPicture: React.FC<{}> = () => {
  const params = useParams() as any;
  const [picture, setPicture] = useState<PicDto>(Object);
  const [pictureScaleState, setPictureScaleState] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setPicture(await PicAPI.getDetailPic(params?.id));
    })();
  }, []);

  const [visitor, setVisitor] = useState<UserDto>(Object);

  useEffect(() => {
    (async () => {
      if (window.localStorage.getItem("access_token"))
        setVisitor(
          await UserAPI.fetchUserCredentials(
            window.localStorage.getItem("access_token")!
          )
        );
    })();
  }, []);

  return (
    <div className="w-full flex flex-col space-y-3 items-center pt-5 pb-10 pr-3 text-gray-200 font-mono">
      <img
        onClick={() => setPictureScaleState(true)}
        src={`data:${picture?.picture_file?.contentType};base64,${picture?.picture_file?.data}`}
        alt=""
        className="object-contain rounded-sm cursor-zoom-in"
      />
      <ScalePicture
        picture={picture?.picture_file}
        modalState={pictureScaleState}
        setModalState={setPictureScaleState}
      />
      <CategoryShowList categoryArray={picture?.categories} />
      <div className="flex flex-col space-y-5 w-full md:w-[70%] h-full pt-3">
        <CardOptions
          picture={picture}
          visitor={visitor}
          setModalState={setPictureScaleState}
        />
        <div className="flex flex-row space-x-4 ">
          <a href={`/user/${picture?.authorPic?.username}`}>
            <PrettyCustomSizeAvatar
              avatar={{
                data: picture?.authorPic?.avatar?.data,
                contentType: picture?.authorPic?.avatar?.contentType,
              }}
              size={5}
            />
          </a>
          <div className="w-full flex flex-col justify-center ">
            <p className="w-full font-bold text-3xl max-h-[12vh] break-all overflow-y-auto scrollbar-hide">
              {picture?.title}
            </p>
            <div className="flex flex-row items-center space-x-1">
              <p className="text-gray-400 text-xs">from</p>
              <p className="font-bold text-md">
                {picture?.authorPic?.username}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div></div>
            <p className="whitespace-nowrap text-gray-400 text-sm">
              Jun 21, 2015
            </p>
          </div>
        </div>
        <div className="flex flex-row space-x-5 text-gray-400 font-semibold pt-2.5">
          <p>137 Favorites</p>
          <div className="flex flex-row items-center space-x-1">
            <PrettyCameraIcon />
            <p>7</p>
            <p>Comments</p>
          </div>
          <p>8K Views</p>
        </div>
        <HashTags hashTags={picture?.hashTags} />
        <div className="max-h-[35vh] break-all overflow-y-auto scrollbar-hide">
          <p>{picture?.description}</p>
        </div>
        <div className="w-full flex flex-col space-y-4 bg-light-soft-black rounded-md py-3.5 px-5">
          <div className="flex flex-row justify-between">
            <p className="font-bold">Picture Size:</p>
            <div className="flex flex-row space-x-1.5">
              <p>1920 x 1080</p>
              <p className="font-semibold">8.67 MB</p>
            </div>
          </div>
        </div>
        <SendComment visitor={visitor} picture={picture} />
        <Comments visitor={visitor} picture={picture} />
      </div>
    </div>
  );
};

export default DetailsPicture;

const HashTags: React.FC<{ hashTags: PicDto["hashTags"] }> = ({ hashTags }) => {
  return (
    <>
      {hashTags?.length > 0 && (
        <div className="flex flex-wrap pt-1.5">
          {hashTags?.map((hashtag: string, hashIndex: number) => (
            <div key={hashIndex} className="pr-1.5 pb-2.5">
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

const CategoryShowList: React.FC<{ categoryArray: CategoryDto[] }> = ({
  categoryArray,
}) => {
  return (
    <div className="w-full flex flex-wrap items-center">
      {categoryArray?.map((category: CategoryDto, categoryIndex: number) => (
        <a
          href={`/category/${category.title.toLocaleLowerCase()}`}
          key={categoryIndex}
          className={`relative p-0.5 h-[3rem] min-w-[50%] md:min-w-[33.3%] 2xl:min-w-[25%]
         4xl:min-w-[20%] group transition duration-150 text-gray-200 cursor-pointer
         hover:scale-110 rounded-sm `}
        >
          <img
            src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
            className="object-cover h-full w-full opacity-40 rounded-sm"
            alt=""
          />
          <div className="absolute top-0 right-1/2 translate-x-1/2 translate-y-1/2">
            <span className="font-bold text-gray-200">{category.title}</span>
          </div>
        </a>
      ))}
    </div>
  );
};
