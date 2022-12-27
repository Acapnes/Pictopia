import Header from "./Menus/Header";
import React, { Suspense, useState } from "react";
import { usePictopiaAccountStore } from "./components/Zustand/store";
import { CategoryDto } from "./Api/User/CategoryDtos/category.dto";
import { PrettyPenIcon } from "./components/Prettys/PrettyIcons";
import { SuspenseVeiw } from "./components/Prettys/PrettyViews";
const PictopiaGrid = React.lazy(() => import("./Picture/Grids/PictopiaGrid"));

const Pictopia: React.FC<{}> = ({}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [postPerPage, setPostPerPage] = useState<number>(20);

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="min-h-screen h-[10rem] flex flex-col space-y-3 bg-soft-black overflow-y-auto overflow-x-hidden"
    >
      <Header />
      <MobileFavoriteCategories />
      <Suspense fallback={<SuspenseVeiw />}>
        <PictopiaGrid currentPage={currentPage} postPerPage={postPerPage} />
      </Suspense>
    </div>
  );
};

export default Pictopia;

const MobileFavoriteCategories: React.FC<{}> = () => {
  const favoriteCategories = usePictopiaAccountStore(
    (state: any) => state.favoriteCategories
  );

  return (
    <>
      {window.innerWidth < 1024 && (
        <div className="flex flex-col space-y-1 px-2.5 lg:hidden">
          <div className="flex flex-row justify-between items-center px-0.5">
            <div className="flex flex-row space-x-1">
              <span className="text-pretty-pink">*</span>
              <p className="text-gray-200 font-bold">Favorite Categories</p>
            </div>
            <a
              href="/edit/usage"
              className="px-1.5 py-1 rounded-sm focus:bg-extra-light-soft-black transition duration-200"
            >
              <PrettyPenIcon size={12} fill="rgb(244, 114, 182)" />
            </a>
          </div>
          <div className="w-full flex flex-row space-x-2 overflow-auto overflow-y-hidden scrollbar-hide">
            {favoriteCategories?.map(
              (category: CategoryDto, categoryIndex: any) => (
                <div
                  onClick={() =>
                    (window.location.href = `/category/${category.title.toLocaleLowerCase()}`)
                  }
                  key={categoryIndex}
                  className="relative w-full mb-1.5 text-start font-semibold text-white rounded-sm h-[3rem] min-w-[7.5rem] cursor-pointer"
                >
                  <img
                    src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                    className="object-cover h-full w-full opacity-75 rounded-sm"
                    alt=""
                  />
                  <div className="absolute top-0 w-full h-full flex flex-row space-x-2 items-center justify-center px-4 py-2 rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
                    <p className="my-2 text-gray-200 font-bold text-lg">
                      {category?.title}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};
