import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { SuspenseVeiw } from "./components/Prettys/PrettyViews";
import { usePaginationStore } from "./components/Zustand";
import CategoryBar from "./Menus/CategoryBar/CategoryBar";
import Header from "./Menus/Header";

const PictopiaGrid = React.lazy(() => import("./Picture/Grids/PictopiaGrid"));

const Pictopia: React.FC<{}> = () => {
  const setCurrentPage = usePaginationStore(
    (state: any) => state.setCurrentPage
  );

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
        <div className="pt-4">
          <Suspense fallback={<SuspenseVeiw text="Pictopia" />}>
            <PictopiaManagementPanel />
            <PictopiaGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Pictopia;

const PictopiaManagementPanel: React.FC<{}> = () => {
  const params = useParams() as any;
  return (
    <div className="w-full flex flex-row px-3 pb-5 items-center justify-between">
      <div className="flex flex-row space-x-1 items-center">
        <p className="font-bold text-pretty-rough-yellow text-xl">
          {params?.category ? params.category.toUpperCase() : "Explore"}
        </p>
        <button className="mt-1 duration-300 hover:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill={"white"}
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-row space-x-5 text-gray-200">
        <button className="border-b-2 pb-2 px-2 font-semibold">Popular</button>
        <button className="border-b-2 pb-2 px-2 font-semibold">Fresh</button>
      </div>
      <div className=" flex flex-row space-x-1">
        <button className="border-[1px] rounded-sm px-1.5 py-0.5 border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-grid-3x3-gap"
            viewBox="0 0 16 16"
          >
            <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z" />
          </svg>
        </button>
        <button className="border-[1px] rounded-sm px-1.5 py-0.5 border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-grid-3x2"
            viewBox="0 0 16 16"
          >
            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5v-8zM1.5 3a.5.5 0 0 0-.5.5V7h4V3H1.5zM5 8H1v3.5a.5.5 0 0 0 .5.5H5V8zm1 0v4h4V8H6zm4-1V3H6v4h4zm1 1v4h3.5a.5.5 0 0 0 .5-.5V8h-4zm0-1h4V3.5a.5.5 0 0 0-.5-.5H11v4z" />
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
      </div>
    </div>
  );
};
