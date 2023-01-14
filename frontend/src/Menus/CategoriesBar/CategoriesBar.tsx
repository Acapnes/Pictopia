import React, { Suspense, useEffect } from "react";
import { CategoryAPI } from "../../Api/User/Category/CategoryApi";
import { CategoryDto } from "../../Api/User/Category/categoryDtos";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import {
  PrettyCompassIcon,
  PrettyOptionsIcon,
  PrettyPenIcon,
  PrettyXIcon,
} from "../../components/Prettys/PrettyIcons";

import { SuspenseVeiw } from "../../components/Prettys/PrettyViews";
import { usePictopiaPublicDrawerStore } from "../../components/Zustand/store";

const CategoriesBar: React.FC<{}> = () => {
  const favoriteCategories = usePictopiaPublicDrawerStore<CategoryDto[]>(
    (state: any) => state.favoriteCategories
  );

  const setFavoriteCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.setFavoriteCategories
  );

  useEffect(() => {
    (async () => {
      setFavoriteCategories(
        await CategoryAPI.getUserFavoriteCategories(
          window.localStorage.getItem("access_token")!
        )
      );
    })();
  }, []);

  return (
    <div className="w-full h-full flex flex-row items-center space-x-3 px-2 py-2 text-white bg-rough-soft-black relative">
      <Suspense fallback={<SuspenseVeiw />}>
        <CustomizeCategories favoriteCategories={favoriteCategories} />
        <FavoriteCategories favoriteCategories={favoriteCategories} />
      </Suspense>
    </div>
  );
};

export default CategoriesBar;

export const CustomizeCategories: React.FC<{
  favoriteCategories: CategoryDto[];
}> = ({ favoriteCategories }) => {
  return (
    <div className="w-fit h-full flex flex-col space-y-5 justify-end items-center relative group">
      <div className="h-full flex flex-row items-center space-x-1.5 bg-rough-soft-black py-1 rounded-sm">
        <PrettyCompassIcon size={24} />
        <p className="font-bold text-lg pr-1 select-none">Categories</p>
        <PrettyPenIcon size={10} />
      </div>
      <div className="absolute w-full z-20">
        <div className="absolute hidden group-hover:block hover:block pt-3">
          <div className=" flex flex-col space-y-3 bg-light-soft-black py-4 px-5">
            <div className="flex flex-col space-y-1 ">
              <p className="text-xs text-gray-400">Favorite Categories</p>
              {favoriteCategories?.map(
                (category: CategoryDto, categoryIndex: any) => (
                  <div key={categoryIndex} className="relative group">
                    <a href={`/category/${category.title.toLocaleLowerCase()}`}>
                      <img
                        src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                        className="object-cover w-full min-w-[15rem] h-[2.5rem] opacity-75 rounded-sm"
                        alt=""
                      />
                      <div className="absolute top-0 w-full h-full flex flex-row space-x-1 justify-between px-3 rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
                        <p className="my-2 text-gray-200 font-bold">
                          {category?.title}
                        </p>
                        <PrettyXIcon />
                      </div>
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="h-full bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] pb-0.5 group relative">
    //   <div className="h-full flex flex-row items-center space-x-1.5 bg-rough-soft-black py-1">
    //     <PrettyCompassIcon size={24} />
    //     <p className="font-bold text-lg pr-1">Categories</p>
    //     <PrettyPenIcon size={10} />
    //   </div>
    //   <div className="absolute top-[2.5rem] hidden group-hover:block hover:block">deneme</div>
    // </div>
  );
};

export const FavoriteCategories: React.FC<{
  favoriteCategories: CategoryDto[];
}> = ({ favoriteCategories }) => {
  return (
    <div className="flex flex-row space-x-1.5 overflow-x-auto scrollbar-hide">
      {favoriteCategories?.map((category: CategoryDto, categoryIndex: any) => (
        <div key={categoryIndex} className="relative group">
          <a href={`/category/${category.title.toLocaleLowerCase()}`}>
            <img
              src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
              className="object-cover w-full min-w-[6rem] h-[3rem] opacity-75 rounded-sm"
              alt=""
            />
            <div className="absolute top-0 w-full h-full flex flex-row space-x-1 justify-center items-center rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
              <p className="my-2 text-gray-200 font-bold">{category?.title}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
