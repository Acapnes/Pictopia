import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryAPI } from "../../Api/User/Category/CategoryApi";
import { CategoryDto } from "../../Api/User/Category/categoryDtos";
import {
  PrettyCompassIcon,
  PrettyPenIcon,
  PrettySearchIcon,
  PrettyXIcon,
} from "../../components/Prettys/PrettyIcons";

import { SuspenseVeiw } from "../../components/Prettys/PrettyViews";
import { useAccountCategoryStore } from "../../components/Zustand/AccountCategoryStore";

const CategoryBar: React.FC<{}> = () => {
  const favoriteCategories = useAccountCategoryStore<CategoryDto[]>(
    (state: any) => state.favoriteCategories
  );

  const setFavoriteCategories = useAccountCategoryStore(
    (state: any) => state.setFavoriteCategories
  );

  const allCategories = useAccountCategoryStore(
    (state: any) => state.allCategories
  );

  const setAllCategories = useAccountCategoryStore(
    (state: any) => state.setAllCategories
  );

  useEffect(() => {
    (async () => {
      setFavoriteCategories(
        await CategoryAPI.getUserFavoriteCategories(
          window.localStorage.getItem("access_token")!
        )
      );
      setAllCategories(await CategoryAPI.getAllCategories());
    })();
  }, []);

  const params = useParams() as any;

  return (
    <>
      {true && (
        <div className="w-full h-fit min-h-[4.5rem] flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3 px-4 py-2 text-white relative">
          <Suspense fallback={<SuspenseVeiw />}>
            <CustomizeCategories
              favoriteCategories={favoriteCategories}
              allCategories={allCategories}
            />
            <FavoriteCategories favoriteCategories={favoriteCategories} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default CategoryBar;

export const FavoriteCategories: React.FC<{
  favoriteCategories: CategoryDto[];
}> = ({ favoriteCategories }) => {
  const params = useParams() as any;

  return (
    <div className="h-full max-h-[3.5rem] flex flex-row space-x-1.5 overflow-x-auto scrollbar-hide">
      {favoriteCategories?.map((category: CategoryDto, categoryIndex: any) => (
        <a
          key={categoryIndex}
          href={`/category/${category.title.toLocaleLowerCase()}`}
          className={`bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm relative`}
        >
          <img
            src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
            className={`object-cover w-full min-w-[8rem] h-full rounded-sm ${
              category?.title.toLocaleLowerCase() === params.category &&
              "pb-1"
            }`}
            alt=""
          />
          <div className="absolute top-0 w-full h-full flex flex-row space-x-1 justify-center items-center rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
            <p className="text-gray-200 font-bold select-none">{category?.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export const CustomizeCategories: React.FC<{
  favoriteCategories: CategoryDto[];
  allCategories: CategoryDto[];
}> = ({ favoriteCategories, allCategories }) => {
  return (
    <div className="w-fit h-full flex flex-col space-y-5 justify-end items-center relative group bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] pb-0.5">
      <div className="h-full flex flex-row items-center space-x-2.5 bg-soft-black pb-0.5 pr-1.5">
        <div className="bg-pretty-rough-yellow p-1.5 rounded-sm">
          <PrettyCompassIcon size={24} fill="black" />
        </div>
        <p className="font-bold text-lg pr-1 select-none">Explore</p>
        <PrettyPenIcon size={10} />
      </div>
      <div className="absolute w-full z-20">
        <div className="absolute hidden group-hover:block hover:block pt-3">
          <div className="flex flex-col space-y-4 py-4 px-5 bg-light-soft-black">
            <div
              className="flex flex-row items-center space-x-1.5 px-1.5 py-1 rounded-sm border-[1px] border-gray-600
             focus-within:border-pretty-rough-yellow duration-300 text-sm"
            >
              <PrettySearchIcon size={14} fill="gray" />
              <input
                type="text"
                placeholder="Search in categories"
                className="bg-transparent outline-none"
              />
            </div>
            <div className=" flex flex-col space-y-3 max-h-[28rem] overflow-auto scrollbar-hide">
              <div className="flex flex-col space-y-1 ">
                <p className="text-xs text-gray-400">Favorite Categories</p>
                {favoriteCategories?.map(
                  (category: CategoryDto, categoryIndex: any) => (
                    <div key={categoryIndex} className="relative group">
                      <a
                        href={`/category/${category.title.toLocaleLowerCase()}`}
                      >
                        <img
                          src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                          className="object-cover w-full min-w-[15rem] h-[2.75rem] opacity-75 rounded-sm"
                          alt=""
                        />
                        <div className="absolute top-0 w-full h-full flex flex-row items-center justify-between px-3 rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
                          <p className="my-2 text-gray-200 font-bold">
                            {category?.title}
                          </p>
                          <button className="p-1 hover:bg-rough-soft-black duration-300 group">
                            <PrettyXIcon size={14} />
                          </button>
                        </div>
                      </a>
                    </div>
                  )
                )}
              </div>
              <hr className="border-gray-600" />
              <div className="flex flex-col space-y-1 ">
                <p className="text-xs text-gray-400">All Categories</p>
                {allCategories?.map(
                  (category: CategoryDto, categoryIndex: any) => (
                    <div key={categoryIndex} className="relative group">
                      <a
                        href={`/category/${category.title.toLocaleLowerCase()}`}
                      >
                        <img
                          src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                          className="object-cover w-full min-w-[15rem] h-[2.75rem] opacity-75 rounded-sm"
                          alt=""
                        />
                        <div className="absolute top-0 w-full h-full flex flex-row items-center justify-between px-3 rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
                          <p className="my-2 text-gray-200 font-bold">
                            {category?.title}
                          </p>
                          <button className="p-1 hover:bg-rough-soft-black duration-300 group">
                            <PrettyXIcon size={14} />
                          </button>
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
    </div>
  );
};
