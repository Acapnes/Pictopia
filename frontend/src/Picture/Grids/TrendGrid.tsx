import React from "react";
import { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import { useParams } from "react-router-dom";
import { usePictopiaStore } from "../../components/Zustand";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyComponents";

const TrendGrid: React.FC<{}> = () => {
  const [pictures, setPictures] = useState<PicDto[]>([]);
  const params = useParams();

  const pagination = usePictopiaStore((state: any) => state.pagination);

  const fetchAndSetPics = async () => {
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
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="div flex flex-col space-y-1.5 py-2">
      <p className="pl-3.5 text-gray-200 font-bold text-lg">Releated✨</p>
      <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-2.5">
        <div className="flex flex-row space-x-3 ">
          {pictures.map((pic: PicDto, picIndex: number) => (
            <div
              className="group relative min-w-fit h-[12rem] object-cover flex flex-col justify-center duration-300 hover:scale-[105%] rounded-sm"
              key={picIndex}
            >
              <img
                loading="lazy"
                src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
                alt=""
                className="min-w-[14rem] max-w-[28rem] h-full object-cover rounded-sm"
              />
              <GridMenu picture={pic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendGrid;

const GridMenu: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <a href={`/detail/${picture?._id}`}>
      <div className="absolute bottom-0 w-full h-full transition duration-500 ease-in-out bg-opacity-50 bg-light-soft-black rounded-sm text-white">
        <div className="w-full h-full flex flex-col">
          <div className="absolute bottom-0 w-full h-fit flex flex-col py-2 px-4 space-y-1">
            <div className="w-full flex flex-row space-x-2 ">
              <div className="w-full flex flex-col space-y-[0.35rem] h-fit">
                <PrettyCustomSizeAvatar
                  avatar={{
                    data: picture?.authorPic?.avatar?.data,
                    contentType: picture?.authorPic?.avatar?.contentType,
                  }}
                  size={2.25}
                />
                <p className="truncate break-all font-bold text-white text-sm">
                  {picture?.title}
                </p>
              </div>
              <div className="w-fit flex flex-col space-y-1.5 justify-end">
                <div className="flex flex-row items-center space-x-0.5 text-xs text-pretty-yellow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="rgb(252, 186, 40)"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <p>321</p>
                </div>
                <div className="flex flex-row items-center space-x-0.5 text-xs text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="rgb(229, 231, 235)"
                    className="bi bi-chat-right-text-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                  </svg>
                  <p>4423</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
