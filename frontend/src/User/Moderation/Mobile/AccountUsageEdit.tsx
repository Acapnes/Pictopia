import React, { ReactNode, useEffect, useState } from "react";
import { AccountAPI } from "../../../Api/User/AccountApi";
import { CategoryAPI } from "../../../Api/User/Category/CategoryApi";
import { CategoryDto } from "../../../Api/User/Category/categoryDtos";
import { ReturnFuncDto } from "../../../Api/Utils/UtilsDtos";
import {
  PrettyHelpIcon,
  PrettySquareFilledAddIcon,
  PrettyTrashIcon,
} from "../../../components/Prettys/PrettyIcons";
import {
  usePictopiaPublicDrawerStore,
  useToastStore,
} from "../../../components/Zustand/store";

const AccountUsageEdit: React.FC<{}> = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-3 lg:grid-cols-2 p-3">
      <FavoriteMapping />
      <SearchCategoriesMapping />
      <EditLastSearches />
    </div>
  );
};

export default AccountUsageEdit;

const FavoriteMapping: React.FC<{}> = () => {
  const favoriteCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.favoriteCategories
  );

  return (
    <div className="w-full flex flex-col space-y-1.5">
      <div className="flex flex-row space-x-1 items-center">
        <PrettyHelpIcon size={14} />
        <p className="font-bold text-gray-200 text-sm lg:text-md">
          Favorite Categories
        </p>
      </div>
      <CategoryMapping
        categories={favoriteCategories}
        icon={<PrettyTrashIcon size={16} fill="white" />}
        graident="bg-gradient-to-t from-[#ff00c6] to-[#ff5478]"
        AddOrRemove={false}
      />
    </div>
  );
};

const SearchCategoriesMapping: React.FC<{}> = ({}) => {
  const defaultCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.defaultCategories
  );
  const [categorySearchInput, setCategorySearchInput] = useState<string>("");
  const [searchedCategories, setsearchedCategories] = useState<CategoryDto[]>(
    []
  );

  useEffect(() => {
    (async () => {
      if (categorySearchInput.length! > 0) {
        setsearchedCategories(
          await CategoryAPI.searchInCategories(categorySearchInput!)
        );
      }
    })();
  }, [categorySearchInput]);

  return (
    <div className="w-full flex flex-col space-y-1.5 text-sm lg:text-md text-gray-200">
      <p className="font-bold">Search in Categories</p>
      <input
        onChange={async (e) => setCategorySearchInput(e.target.value)}
        type="text"
        className="outline-none bg-transparent border-2 border-[#ff5478] py-1.5 px-1 rounded-sm"
      />
      {categorySearchInput.length! > 0 && (
        <CategoryMapping
          categories={searchedCategories}
          icon={<PrettySquareFilledAddIcon size={16} fill="white" />}
          graident="bg-gradient-to-t from-[#ff8a05] to-[#ff00c6]"
          AddOrRemove
        />
      )}

      <div className="flex flex-col space-y-1">
        <p className="font-semibold text-gray-400">
          Some categories you might be like
        </p>
        <CategoryMapping
          categories={defaultCategories}
          icon={<PrettySquareFilledAddIcon size={16} fill="white" />}
          graident="bg-gradient-to-t from-[#ff8a05] to-[#ff00c6]"
          AddOrRemove
        />
      </div>
    </div>
  );
};

const CategoryMapping: React.FC<{
  categories: CategoryDto[];
  icon: ReactNode;
  graident?: string;
  AddOrRemove?: boolean;
}> = ({ categories, icon, graident, AddOrRemove }) => {
  const setDefaultCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.setDefaultCategories
  );

  const defaultCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.defaultCategories
  );

  const favoriteCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.favoriteCategories
  );

  const setFavoriteCategories = usePictopiaPublicDrawerStore(
    (state: any) => state.setFavoriteCategories
  );

  return (
    <div className="max-h-[35vh] flex flex-wrap lg:max-h-full overflow-auto scrollbar-hide ">
      {categories?.map((category: CategoryDto, categoryIndex: any) => (
        <div
          key={categoryIndex}
          className="relative w-full md:w-[33%] lg:w-[50%] 2xl:w-[33%] p-1 text-start font-semibold text-white rounded-sm h-[4rem] min-w-[8rem] cursor-pointer"
        >
          <img
            src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
            className="object-cover h-full w-full opacity-75 rounded-sm"
            alt=""
          />
          <div className="absolute py-1 pr-1 top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
            <p className="pl-2 text-gray-200 font-bold text-lg">
              {category?.title}
            </p>
            <div
              onClick={async () => {
                if (AddOrRemove) {
                  await CategoryAPI.AddFavoriteCategory(category._id).then(
                    async (resp) => {
                      if (resp.success) {
                        setFavoriteCategories([
                          ...favoriteCategories,
                          category,
                        ]);
                        defaultCategories.splice(categoryIndex, 1);
                        return;
                      }
                    }
                  );
                } else {
                  await CategoryAPI.RemoveFavoriteCategory(category._id).then(
                    async (resp) => {
                      if (resp.success) {
                        setDefaultCategories([...defaultCategories, category]);
                        favoriteCategories.splice(categoryIndex, 1);
                        return;
                      }
                    }
                  );
                }
              }}
              className={`h-full px-2 md:px-2.5 xl:px-3 flex items-center ${graident} rounded-r-sm`}
            >
              {icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EditLastSearches: React.FC<{}> = () => {
  const lastSearches = usePictopiaPublicDrawerStore<string[]>(
    (state: any) => state.lastSearches
  );
  const setToastState = useToastStore((state: any) => state.setToastState);

  return (
    <>
      {lastSearches?.length > 0 && (
        <div className="w-full flex flex-col space-y-1">
          <div className="flex flex-col space-y-0.5">
            <div className="flex flex-row space-x-1 text-gray-200 font-bold items-center">
              <PrettyHelpIcon />
              <p>Recently Searches</p>
            </div>
            <p className="text-sm text-gray-400 first-letter:pl-5">
              Pictopia determines the images it will recommend to you based on
              your recent searches.
            </p>
          </div>
          <div className="w-full flex flex-col space-y-1.5 ">
            {lastSearches?.map((search: string, searchIndex: number) => (
              <button
                onClick={() => {
                  AccountAPI.DeleteUserLastSearched(
                    window.localStorage.getItem("access_token")!,
                    search
                  ).then(
                    async (loginResp: ReturnFuncDto) =>
                      await setToastState(loginResp.message)
                  );
                }}
                key={searchIndex}
                className="w-fit max-w-[100%] truncate flex flex-row space-x-5 px-1.5 py-1.5 bg-extra-light-soft-black
            hover:bg-rough-soft-black transition duration-300 rounded-sm group"
              >
                <p className="text-gray-200 truncate">{search}</p>
                <div className="h-full px-1.5 rounded-sm flex items-center group-hover:bg-2xl-extra-light-soft-black">
                  <PrettyTrashIcon size={16} fill="white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
