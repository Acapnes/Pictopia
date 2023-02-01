import React, { useState } from "react";
import { PicDto } from "../Api/Pic/picDtos";
import {
  PrettyBookMarksIcon,
  PrettyDownloadIcon,
  PrettyLinkIcon,
  PrettyShareIcon,
} from "../components/Prettys/PrettyIcons";
import { usePictopiaStore } from "../components/Zustand";

const PictureBasket: React.FC<{}> = () => {
  const [basketState, setBasketState] = useState<number>(0);
  const pictureBasket = usePictopiaStore<PicDto[]>(
    (state: any) => state.pictureBasket
  );

  return (
    <div className="min-w-screen w-full max-h-[75%] fixed bottom-0 z-30 text-gray-200 text-sm lg:px-12">
      <div
        className={`w-full h-[3.5rem] pb-1.5 duration-500 flex flex-col space-y-1 px-4 pt-3 bg-rough-soft-black rounded-t-md border-[2px] border-2xl-extra-light-soft-black border-b-0 bg-opacity-90 ${
          (basketState === 1 && "h-[16rem]") ||
          (basketState === 2 && "h-[34rem]")
        }`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-1 items-center">
            <p>Your Basket</p>
            <p className="text-gray-400">-</p>
            <p>{pictureBasket?.length} Pictures</p>
          </div>
          <div>
            <p className="font-bold duration-500 opacity-0 hover:opacity-100 text-pretty-pink">
              Added by Alper
            </p>
          </div>
          <div className="flex flex-row space-x-2">
            <button className="flex items-center duration-300 bg-light-soft-black hover:bg-pretty-yellow hover:bg-opacity-80 px-4 rounded-sm ">
              <PrettyBookMarksIcon />
            </button>
            <button className="flex items-center duration-300 bg-light-soft-black hover:bg-pretty-pink hover:bg-opacity-80 px-4 rounded-sm ">
              <PrettyShareIcon />
            </button>
            <button className="flex items-center duration-300 bg-light-soft-black hover:bg-pretty-pink hover:bg-opacity-80 px-4 rounded-sm ">
              <PrettyDownloadIcon />
            </button>
            <button className="flex items-center duration-300 bg-light-soft-black hover:bg-pretty-pink hover:bg-opacity-80 px-4 rounded-sm ">
              <PrettyLinkIcon />
            </button>
            <button
              onClick={() => {
                if (basketState === 0 || basketState === 1)
                  setBasketState(basketState + 1);
                else setBasketState(0);
              }}
              className={`flex flex-col items-center justify-center -space-y-4 bg-light-soft-black px-4 rounded-sm py-0.5`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                className={`duration-300 ${
                  basketState === 2 ? "rotate-90" : "-rotate-90"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                className={`-rotate-90 ${
                  basketState === 1 ? "block" : "hidden"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide">
          <div className="w-full h-full flex flex-row space-x-3">
            {pictureBasket?.map((pic: PicDto, picIndex: number) => (
              <div
                className="group relative min-w-fit h-full object-cover flex flex-col justify-center duration-300 hover:scale-[105%] rounded-sm"
                key={picIndex}
              >
                <img
                  loading="lazy"
                  src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
                  alt=""
                  className="min-w-[14rem] max-w-[28rem] h-full object-cover rounded-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureBasket;
