import React from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { Masonry } from "@mui/lab";
import { usePictopiaStore } from "../../components/Zustand";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyComponents";
import {
  PrettyBookMarksIcon,
  PrettyDashIcon,
  PrettySquareAddIcon,
} from "../../components/Prettys/PrettyIcons";

const PictopiaGrid: React.FC<{ pictures: PicDto[] }> = ({ pictures }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
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
  );
};

export default PictopiaGrid;

const PictopiaGridMenu: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const setPictureBasket = usePictopiaStore(
    (state: any) => state.setPictureBasket
  );

  const pictureBasket = usePictopiaStore((state: any) => state.pictureBasket);

  return (
    <a href={`/detail/${picture?._id}`}>
      <div className="absolute right-0 top-0 w-14  overflow-hidden inline-block bg-transparent">
        <div
          className={`relative h-20 bg-green-400 duration-300 -rotate-45 transform origin-top-left ${
            pictureBasket.some(
              (basketPicture: PicDto) => basketPicture._id === picture._id
            )
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="absolute bottom-1/3 left-1/5 rotate-45 p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-basket3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
            </svg>
          </div>
        </div>
      </div>
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
                {pictureBasket.some(
                  (basketPicture: PicDto) => basketPicture._id === picture._id
                ) ? (
                  <PrettyDashIcon fill="white" />
                ) : (
                  <PrettySquareAddIcon fill="white" />
                )}
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
