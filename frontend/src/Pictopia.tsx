import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PicAPI } from "./Api/Pic/PicApi";
import { PicDto } from "./Api/Pic/picDtos";
import {
  PrettyRefreshIcon,
  PrettySquareAddIcon,
} from "./components/Prettys/PrettyIcons";
import { SuspenseVeiw } from "./components/Prettys/PrettyViews";
import { usePictopiaStore } from "./components/Zustand";
import CategoryBar from "./Menus/CategoryBar/CategoryBar";
import Header from "./Menus/Header";
import PictureBasket from "./Menus/PictureBasket";
import TrendGrid from "./Picture/Grids/TrendGrid";

const PictopiaGrid = React.lazy(() => import("./Picture/Grids/PictopiaGrid"));

const Pictopia: React.FC<{}> = () => {
  const setCurrentPage = usePictopiaStore((state: any) => state.setCurrentPage);

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight) {
      setCurrentPage();
    }
  };

  const [picturesLoading, setPicturesLoading] = useState<boolean>(false);
  const params = useParams();

  const pagination = usePictopiaStore((state: any) => state.pagination);
  const setPictures = usePictopiaStore((state: any) => state.setPictures);
  const pictures = usePictopiaStore<PicDto[]>((state: any) => state.pictures);

  const fetchAndSetPics = async () => {
    setPicturesLoading(true);
    if (params?.category) {
      setPictures(
        await PicAPI.getPicsByCategory({
          category: params?.category,
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })
      );
    } else if (params?.input) {
      setPictures(
        await PicAPI.getPicsBySeachInput({
          input: params?.input,
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })
      );
    } else if (params?.tag) {
      setPictures(
        await PicAPI.getPicsBySeachInput({
          input: `#${params!.tag}`,
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })
      );
    } else {
      setPictures(
        await PicAPI.getPicsByExplore({
          currentPage: pagination.currentPage,
          postPerPage: pagination.postPerPage,
        })
      );
    }
    setPicturesLoading(false);
  };

  useEffect(() => {
    !picturesLoading && fetchAndSetPics();
  }, [pagination.currentPage]);

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="min-h-screen h-0 max-h-full flex flex-auto flex-col overflow-y-auto overflow-x-hidden bg-soft-black font-mono"
    >
      <div className="z-20 sticky top-0">
        <Header />
        <PictureBasket />
      </div>
      <TrendGrid />
      <CategoryBar />
      <Suspense fallback={<SuspenseVeiw text="Pictopia" />}>
        <PictopiaManagementPanel refreshFunc={fetchAndSetPics} />
        {picturesLoading && <LoadingAnimation />}
        <PictopiaGrid pictures={pictures} />
      </Suspense>
    </div>
  );
};

export default Pictopia;

const PictopiaManagementPanel: React.FC<{
  refreshFunc: Function;
}> = ({ refreshFunc }) => {
  const params = useParams() as any;

  return (
    <div className="w-full flex flex-row space-x-4 px-3.5 pb-4 pt-2 items-center justify-between text-xs md:text-base">
      <div className="w-full md:w-fit flex flex-row space-x-1 items-center">
        {params?.category ? (
          <div className="w-full md:w-fit relative group rounded-full bg-extra-light-soft-black">
            {/* <img
              src={`data:${data?.getCategoryByTitle?.category_picture_file?.contentType};base64,${data?.getCategoryByTitle?.category_picture_file?.data}`}
              className={`object-cover min-w-full md:min-w-[12rem] h-[2.5rem] rounded-lg ${
                data?.getCategoryByTitle?.title.toLocaleLowerCase() ===
                  params.category && "pb-0.5"
              }`}
              alt="Category"
            /> */}
            <div className="absolute top-0 w-full h-full flex flex-row space-x-1 justify-center items-center rounded-sm duration-300 bg-rough-soft-black bg-opacity-60">
              {/* <p className="my-2 text-gray-200 font-bold select-none">
                {data?.getCategoryByTitle?.title}
              </p> */}
            </div>
          </div>
        ) : (
          <p className="font-bold text-pretty-rough-yellow text-xl">
            {params?.category ? params.category.toUpperCase() : "Explore"}
          </p>
        )}
        <button
          onClick={async () => {
            refreshFunc();
          }}
          className="mt-1 duration-300 hover:rotate-180 mb-[0.1rem]"
        >
          <PrettyRefreshIcon fill="white" size={18} />
        </button>
      </div>
      <div className="flex flex-row space-x-5 text-gray-200">
        <button className="border-b-2 pb-2 px-2 font-semibold">Popular</button>
        <button className="border-b-2 pb-2 px-2 font-semibold">Fresh</button>
      </div>
      <div className=" flex flex-row space-x-1">
        <button className="border-[1px] rounded-sm px-1 border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-dash"
            viewBox="0 0 16 16"
          >
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </button>
        <button className="border-[1px] rounded-sm px-1.5 py-0.5 border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-layout-sidebar"
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2V2z" />
          </svg>
        </button>
        <button className="border-[1px] rounded-sm px-1 border-gray-400">
          <PrettySquareAddIcon fill="white" size={18} />
        </button>
      </div>
    </div>
  );
};

const LoadingAnimation: React.FC<{}> = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center">
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
