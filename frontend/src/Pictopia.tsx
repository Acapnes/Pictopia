import { gql, useQuery } from "@apollo/client";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  PrettyRefreshIcon,
  PrettySquareAddIcon,
} from "./components/Prettys/PrettyIcons";
import { SuspenseVeiw } from "./components/Prettys/PrettyViews";
import { usePictopiaStore } from "./components/Zustand";
import CategoryBar from "./Menus/CategoryBar/CategoryBar";
import Header from "./Menus/Header";
import TrendGrid from "./Picture/Grids/TrendGrid";

const PictopiaGrid = React.lazy(() => import("./Picture/Grids/PictopiaGrid"));

const Pictopia: React.FC<{}> = () => {
  const setCurrentPage = usePictopiaStore((state: any) => state.setCurrentPage);

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight) {
      setCurrentPage();
    }
  };

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="min-h-screen h-[0rem] max-h-full overflow-y-auto overflow-x-hidden bg-soft-black font-mono"
    >
      <div className="flex flex-auto flex-col pb-4 bg-soft-black">
        <Header />
        <CategoryBar />
        <TrendGrid />
        <Suspense fallback={<SuspenseVeiw text="Pictopia" />}>
          <PictopiaManagementPanel />
          <PictopiaGrid />
        </Suspense>
      </div>
    </div>
  );
};

export default Pictopia;

const PictopiaManagementPanel: React.FC<{}> = () => {
  const params = useParams() as any;

  const GET_CATEGORY_PICTURE_FILE = gql`
    query GetCategoryByTitle($title: String!) {
      getCategoryByTitle(title: $title) {
        title
        category_picture_file {
          data
          contentType
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_CATEGORY_PICTURE_FILE, {
    variables: {
      title:
        params?.category?.charAt(0)?.toUpperCase() +
        params?.category?.slice(1, params?.category?.length),
    },
  });

  return (
    <div className="w-full flex flex-row space-x-4 px-3.5 pb-10 pt-2 items-center justify-between text-xs md:text-base">
      <div className="w-full md:w-fit flex flex-row space-x-1 items-center">
        {params?.category ? (
          <div className="w-full md:w-fit relative group rounded-full bg-extra-light-soft-black">
            <img
              src={`data:${data?.getCategoryByTitle?.category_picture_file?.contentType};base64,${data?.getCategoryByTitle?.category_picture_file?.data}`}
              className={`object-cover min-w-full md:min-w-[12rem] h-[2rem] rounded-lg ${
                data?.getCategoryByTitle?.title.toLocaleLowerCase() ===
                  params.category && "pb-0.5"
              }`}
              alt="Category"
            />
            <div className="absolute top-0 w-full h-full flex flex-row space-x-1 justify-center items-center rounded-sm duration-300 bg-rough-soft-black bg-opacity-60">
              <p className="my-2 text-gray-200 font-bold select-none">
                {data?.getCategoryByTitle?.title}
              </p>
            </div>
          </div>
        ) : (
          <p className="font-bold text-pretty-rough-yellow text-xl">
            {params?.category ? params.category.toUpperCase() : "Explore"}
          </p>
        )}
        <button className="mt-1 duration-300 hover:rotate-180 mb-[0.1rem]">
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
