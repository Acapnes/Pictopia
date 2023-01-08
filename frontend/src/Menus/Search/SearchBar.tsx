import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import {
  PrettyCompassIcon,
  PrettySearchIcon,
  PrettySmallArrowUpIcon,
} from "../../components/Prettys/PrettyIcons";
import { CategoryDto } from "../../Api/User/Category/categoryDtos";
import { CategoryAPI } from "../../Api/User/Category/CategoryApi";
import { usePictopiaPublicAccountStore } from "../../components/Zustand/store";
import { AccountAPI } from "../../Api/User/AccountApi";
import { useParams } from "react-router-dom";
import { LastSearchs } from "./Account/AccountBar";
import { SearchDefaultSuggests } from "./SearchResult";
import { PrettyRainbowDiv } from "../../components/Prettys/PrettyComponents";
import { SuspenseVeiw } from "../../components/Prettys/PrettyViews";
// import SearchUsers from "./Searches/SearchUsers";
// import FavoriteCategories from "./Category/FavoriteCategories";
// import DefaultCategories from "./Category/DefaultCategories";

const SearchUsers = React.lazy(() => import("./Searches/SearchUsers"));
const FavoriteCategories = React.lazy(
  () => import("./Category/FavoriteCategories")
);
const DefaultCategories = React.lazy(
  () => import("./Category/DefaultCategories")
);

const SearchBar: React.FC<{ user: UserDto }> = ({ user }) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [searchInputvalue, setSearchInputvalue] = useState<string>();

  const setDefaultCategories = usePictopiaPublicAccountStore(
    (state: any) => state.setDefaultCategories
  );

  const setInitialAccountValues = usePictopiaPublicAccountStore(
    (state: any) => state.setInitialAccountValues
  );

  useEffect(() => {
    (async () => {
      if (window.localStorage.getItem("access_token")) {
        setInitialAccountValues(
          await CategoryAPI.getAllCategoriesByDevidedUserFavorites(
            window.localStorage.getItem("access_token")!
          ),
          await CategoryAPI.getUserFavoriteCategories(
            window.localStorage.getItem("access_token")!
          ),
          await AccountAPI.GetUsersLastSearchedList(
            window.localStorage.getItem("access_token")!
          )
        );
      } else {
        setDefaultCategories(await CategoryAPI.getAllCategories());
      }
    })();
  }, []);

  const favoriteCategories = usePictopiaPublicAccountStore<CategoryDto[]>(
    (state: any) => state.favoriteCategories
  );

  return (
    <div className="w-full hidden lg:flex lg:items-center relative">
      <PrettyRainbowDiv advStyle="w-full" advChildStyle="w-full">
        <div
          onClick={() => setShowSearchMenu(true)}
          className="flex flex-row justify-between space-x-2"
        >
          <div className="h-full flex items-center mt-[0.25rem]">
            <PrettySearchIcon fill={"white"} />
          </div>
          <input
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                searchInputvalue?.length &&
                searchInputvalue?.length > 0
              ) {
                if (searchInputvalue[0] === "#") {
                  window.location.href = `/search/tags/${searchInputvalue.slice(
                    1,
                    searchInputvalue.length
                  )}`;
                } else {
                  window.location.href = `/search/${searchInputvalue}`;
                }
              }
            }}
            autoComplete="off"
            id="SearchInput"
            onChange={(e) => {
              setSearchInputvalue(e.target.value);
            }}
            type="text"
            placeholder="Search by type in pictures & hashtags & users..."
            className="outline-none bg-transparent text-gray-100 w-full placeholder:font-semibold"
          />
        </div>
        {showSearchMenu && (
          <div
            onClick={() => setShowSearchMenu(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <PrettySmallArrowUpIcon size={18} />
          </div>
        )}
      </PrettyRainbowDiv>
      {showSearchMenu && (
        <div className="absolute top-[4rem] w-full shadow-lg">
          <div className="w-full h-fit p-0.5 inline-flex items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
            <div className=" w-full p-3.5 bg-soft-black rounded-sm relative">
              <div className="w-full flex flex-row space-x-2 max-h-[55vh] overflow-y-auto scrollbar-hide">
                <div className="min-w-[25vw] 2xl:min-w-[15vw] max-w-[25vw] 2xl:max-w-[15vw] flex flex-col space-y-2.5 w-fit sticky top-0 resiza">
                  <Suspense fallback={<SuspenseVeiw text="Category Panel" />}>
                    <CurrentCategory />
                    <FavoriteCategories
                      favoriteCategories={favoriteCategories}
                      user={user}
                    />
                  </Suspense>
                </div>
                <div className="h-full w-full flex flex-col space-y-2.5">
                  <Suspense fallback={<SuspenseVeiw />}>
                    <LastSearchs />
                    <SearchDefaultSuggests searchInput={searchInputvalue!} />
                    <SearchUsers searchInput={searchInputvalue!} size={4} />
                    <DefaultCategories />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

const CurrentCategory: React.FC<{}> = () => {
  const params = useParams() as any;
  const [currentCategory, setCurrentCategory] = useState<CategoryDto>(Object);

  useEffect(() => {
    (async () => {
      if (params.category) {
        setCurrentCategory(
          await CategoryAPI.getCategoryByTitle(
            (await params.category.charAt(0).toLocaleUpperCase()) +
              params.category.slice(1)
          )
        );
      }
    })();
  }, []);

  return (
    <>
      {currentCategory?.title ? (
        <div className="relative text-start font-semibold text-white rounded-sm h-[4rem] cursor-pointer">
          <img
            src={`data:${currentCategory?.category_picture_file?.contentType};base64,${currentCategory?.category_picture_file?.data}`}
            className=" object-cover h-full w-full opacity-80 rounded-sm border-2"
            alt=""
          />
          <div className="absolute top-0 w-full h-full text-start flex flex-row space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
            <div>
              <PrettyCompassIcon />
            </div>
            <p className="my-2 text-gray-300 font-bold text-2xl">
              {currentCategory?.title}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative min-w-[25vw] 2xl:min-w-[15vw] text-start font-semibold text-white rounded-sm h-[4rem]">
          <img
            src="/explore.jpg"
            className=" object-none h-full w-full bg-opacity-60 rounded-sm border-2"
            alt=""
          />
          <div className="absolute top-0 w-full h-full text-start flex flex-row space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
            <div>
              <PrettyCompassIcon />
            </div>
            <p className="my-2 text-gray-300 font-bold text-2xl">Explore</p>
          </div>
        </div>
      )}
    </>
  );
};
