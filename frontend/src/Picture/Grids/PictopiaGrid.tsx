import { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import React from "react";
import { Masonry } from "@mui/lab";
import { useParams } from "react-router-dom";
import { GridMenu } from "./Grids";
import { usePictopiaStore } from "../../components/Zustand";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyComponents";
import { PrettySquareAddIcon } from "../../components/Prettys/PrettyIcons";

const PictopiaGrid: React.FC<{}> = () => {
  const [pictures, setPictures] = useState<PicDto[]>([]);
  const [picturesLoading, setPicturesLoading] = useState<boolean>(false);
  const params = useParams();

  const pagination = usePictopiaStore((state: any) => state.pagination);

  const fetchAndSetPics = async () => {
    setPicturesLoading(true);
    if (params?.category) {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsByCategory({
          category: params?.category,
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })),
      ]);
    } else if (params?.input) {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsBySeachInput({
          input: params?.input,
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })),
      ]);
    } else if (params?.tag) {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsBySeachInput({
          input: `#${params!.tag}`,
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })),
      ]);
    } else {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsByExplore({
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })),
      ]);
    }
    setPicturesLoading(false);
  };

  useEffect(() => {
    !picturesLoading && fetchAndSetPics();
  }, [pagination.currentPage]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {picturesLoading && <LoadingAnimation />}
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 5 }} spacing={3}>
          {pictures.map((pic: PicDto, picIndex: number) => (
            <div
              className="group relative h-fit w-full flex flex-col justify-center duration-300 hover:scale-[120%] hover:z-10 overflow-hidden"
              key={picIndex}
            >
              <img
                loading="lazy"
                src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
                alt=""
                className="min-w-full rounded-sm min-h-[12rem]"
              />
              <PictopiaGridMenu picture={pic} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default PictopiaGrid;

const PictopiaGridMenu: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const setPictureBasket = usePictopiaStore(
    (state: any) => state.setPictureBasket
  );

  return (
    <a href={`/detail/${picture?._id}`}>
      <div
        className="absolute bottom-0 w-full h-full transition duration-500 ease-in-out bg-light-soft-black opacity-0 bg-opacity-0 group-hover:bg-opacity-50
        group-hover:opacity-90 group-hover:shadow-lg rounded-sm text-white"
      >
        <div className="absolute bottom-0 w-full h-full flex flex-col justify-between py-2 px-2 space-y-1">
          <div className="flex flex-row justify-between">
            <div className="p-1 bg-light-soft-black rounded-sm">
              <p className="font-bold text-xs relative ">
                {picture?.picture_file?.contentType.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex items-center ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPictureBasket(picture);
                }}
                className="h-full bg-light-soft-black px-2 bg-opacity-70 rounded-sm duration-150 hover:bg-extra-rough-soft-black"
              >
                <PrettySquareAddIcon fill="white" />
              </button>
            </div>
          </div>
          <div className="flex flex-col px-2">
            <div className="flex flex-col space-y-[0.35rem] w-fit h-fit ">
              <PrettyCustomSizeAvatar
                avatar={{
                  data: picture?.authorPic?.avatar?.data,
                  contentType: picture?.authorPic?.avatar?.contentType,
                }}
                size={2.75}
              />
            </div>
            <div className="w-full">
              <p className="truncate break-all font-bold text-white text-sm">
                {picture?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const LoadingAnimation: React.FC<{}> = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[2rem] h-[2.5rem] flex flex-row my-5">
        <div className="h-full w-full animate-[bounce_1.5s_infinite_100ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_200ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_300ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
      </div>
      <div className="w-[2rem] h-[2.5rem] flex flex-row my-5">
        <div className="h-full w-full animate-[bounce_1.5s_infinite_400ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_500ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_600ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
      </div>
    </div>
  );
};
