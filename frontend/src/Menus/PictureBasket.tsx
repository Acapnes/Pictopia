import React, { useState } from "react";
import { PicDto } from "../Api/Pic/picDtos";
import {
  PrettyBookMarksIcon,
  PrettyDownloadIcon,
  PrettyShareIcon,
} from "../components/Prettys/PrettyIcons";
import { usePictopiaStore } from "../components/Zustand";

const PictureBasket: React.FC<{}> = () => {
  const [basketState, setBasketState] = useState<boolean>(false);
  const pictureBasket = usePictopiaStore<PicDto[]>(
    (state: any) => state.pictureBasket
  );

  return (
    <div className={`max-h-[75%] text-gray-200 text-sm`}>
      <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] pb-[0.05rem]">
        <div
          className={`h-[3.5rem] duration-500 flex flex-col space-y-2.5 px-4 py-4 bg-rough-soft-black whitespace-nowrap
             ${basketState && "h-[26rem]"}`}
        >
          <div className="flex flex-col md:flex-row justify-evenly">
            <div className="flex flex-row space-x-1 items-center justify-center">
              <p>Your Basket</p>
              <p className="text-gray-400">-</p>
              <p>{pictureBasket?.length} Pictures</p>
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
              <button
                onClick={() => {
                  if (!basketState) setBasketState(true);
                  else setBasketState(false);
                }}
                className={`flex flex-col items-center justify-center -space-y-4 bg-light-soft-black px-4 rounded-sm py-0.5`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  className={`duration-300 ${
                    !basketState ? "rotate-90" : "-rotate-90"
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
    </div>
  );
};

export default PictureBasket;
