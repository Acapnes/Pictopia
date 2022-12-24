import { useEffect, useState } from "react";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import {
  PrettyCompassIcon,
  PrettyErrorIcon,
  PrettyProfileIcon,
  PrettySearchIcon,
  PrettySignIcon,
  PrettySmallArrowUpIcon,
} from "../../components/Prettys/PrettyIcons";
import { CategoryDto } from "../../Api/User/CategoryDtos/category.dto";
import { CategoryAPI } from "../../Api/User/CategoryApi";
import { UserAPI } from "../../Api/User/UserApi";
import { usePictopiaDNDStore } from "../../components/Zustand/store";
import DefaultCategories from "./Category/DefaultCategories";
import FavoriteCategories from "./Category/FavoriteCategories";
import { AccountAPI } from "../../Api/User/AccountApi";
import { useParams } from "react-router-dom";

const SearchBar: React.FC<{ user: UserDto }> = ({ user }) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [searchInputvalue, setSearchInputvalue] = useState<string>();
  const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);

  const searchUsers = async (username: string) => {
    setSearchedUsers(await UserAPI.findUserByUsername(username));
  };

  const setDefaultCategories = usePictopiaDNDStore(
    (state: any) => state.setDefaultCategories
  );
  const setFavoriteCategories = usePictopiaDNDStore(
    (state: any) => state.setFavoriteCategories
  );

  const FetchCategories = async () => {
    window.localStorage.getItem("access_token");
    if (window.localStorage.getItem("access_token")) {
      setFavoriteCategories(
        await CategoryAPI.getUserFavoriteCategories(
          window.localStorage.getItem("access_token")!
        )
      );
      setDefaultCategories(
        await CategoryAPI.getAllCategoriesByDevidedUserFavorites(
          window.localStorage.getItem("access_token")!
        )
      );
    } else {
      setDefaultCategories(await CategoryAPI.getAllCategories());
    }
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  const defaultCategories = usePictopiaDNDStore<CategoryDto[]>(
    (state: any) => state.defaultCategories
  );
  const favoriteCategories = usePictopiaDNDStore<CategoryDto[]>(
    (state: any) => state.favoriteCategories
  );

  return (
    <div className="w-full hidden md:flex md:items-center relative">
      <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-semibold overflow-hidden rounded-sm">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
        <span className=" w-full px-4 md:py-2 sm:py-1 transition-all ease-out bg-gray-900 rounded-sm duration-400 relative">
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
                if (e.target.value) {
                  searchUsers(e.target.value);
                }
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
        </span>
      </div>
      {showSearchMenu && (
        <div className="absolute top-[4rem] w-full shadow-lg">
          <div className="w-full p-0.5 inline-flex items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
            <div className=" w-full p-3.5 bg-soft-black  rounded-sm relative">
              <div className="w-full flex flex-row space-x-2">
                <div className="flex flex-col space-y-2 w-fit">
                  <CurrentCategory />
                  <FavoriteCategories
                    favoriteCategories={favoriteCategories}
                    user={user}
                  />
                </div>
                <div className="min-h-[60vh] h-full w-full flex flex-col space-y-2 ">
                  <LastSearchs />
                  {searchInputvalue ? (
                    <div className="flex flex-col space-y-3 max-h-[60vh]">
                      <SearchResults searchInput={searchInputvalue} />
                      <SearchMenuUsersGrid searchedUsers={searchedUsers} />
                    </div>
                  ) : (
                    <DefaultCategories defaultCategories={defaultCategories} />
                  )}
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

export { SearchResults, SearchMenuUsersGrid };

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
        <div className="relative min-w-[25vw] 2xl:min-w-[15vw] text-start font-semibold text-white rounded-sm h-[4rem] cursor-pointer">
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

const SearchResults: React.FC<{
  searchInput: string;
}> = ({ searchInput }) => {
  return (
    <>
      <div className="flex flex-col space-y-2 max-h-[60vh] text-gray-200">
        <a
          href={`/search/${searchInput}`}
          className="flex flex-row space-x-1.5 py-1.5 bg-light-soft-black px-2 rounded-md items-center"
        >
          <PrettySearchIcon size={14} />
          <span className="">
            Search in pictures
            <span className="font-bold pl-1">{searchInput}</span>
          </span>
        </a>

        <a
          href={`/search/tags/${searchInput}`}
          className="flex flex-row space-x-1.5 py-1.5 bg-light-soft-black px-2 rounded-md items-center"
        >
          <PrettySearchIcon size={14} />
          <span className="">
            Search in hashtags
            <span className="font-bold pl-1">#{searchInput}</span>
          </span>
        </a>
      </div>
    </>
  );
};

const SearchMenuUsersGrid: React.FC<{ searchedUsers: UserDto[] }> = ({
  searchedUsers,
}) => {
  return (
    <div className="flex justify-center overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-1 gap-4 w-full">
        {searchedUsers?.length > 0 ? (
          searchedUsers?.map((user: UserDto, userIndex: number) => (
            <a
              href={`/user/${user.username}`}
              className="flex flex-row space-x-3 items-center group bg-rough-soft-black bg-opacity-0 hover:bg-opacity-90 duration-300 rounded-l-full cursor-pointer"
              key={userIndex}
            >
              {user?.avatar?.contentType && user?.avatar?.data ? (
                <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[4rem] h-[4rem] relative">
                  <img
                    src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.data}`}
                    alt=""
                    className="rounded-full w-full h-full object-cover p-0.5"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full w-[4rem] h-[4rem] relative p-0.5">
                  <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
                    <PrettyProfileIcon size={24} fill={"white"} />
                  </div>
                </div>
              )}

              <div className="w-full flex items-center truncate">
                <div className="w-full flex flex-row justify-between pr-4 items-center text-gray-200">
                  <div className="w-full flex flex-row space-x-2 ">
                    <p className="font-bold truncate">{user?.username}</p>
                    <p className="opacity-50 truncate">{user?.name}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 duration-200">
                    <PrettySignIcon size={22} />
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="w-full flex flex-row space-x-1.5 items-center justify-center py-3 rounded-sm">
            <PrettyErrorIcon size={16} fill={"white"} />
            <span className="text-gray-200 text-lg font-semibold">
              No User Found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const LastSearchs: React.FC<{}> = () => {
  const [lastSearches, setLastSearches] = useState<UserDto["lastSearched"]>([]);

  const getLastSearches = async () => {
    if (window.localStorage.getItem("access_token")) {
      setLastSearches(
        await AccountAPI.GetUsersLastSearchedList(
          window.localStorage.getItem("access_token")!
        )
      );
    }
  };

  useEffect(() => {
    getLastSearches();
  }, []);

  return (
    <>
      {lastSearches.length > 0 && (
        <div className="flex flex-wrap items-center h-fit pb-1.5 px-1.5 border-b-2 border-pretty-pink max-h-[7.5rem] overflow-y-auto scrollbar-hide">
          {lastSearches.map((search, searchIndex) => (
            <div
              key={searchIndex}
              className="bg-slate-800 rounded-sm mx-1.5 mb-1.5 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-sm text-center duration-300"
            >
              <a
                href={
                  search[0] === "#"
                    ? `/search/tags/${search.slice(1, search.length)}`
                    : `/search/${search}`
                }
              >
                <div className="px-2.5 py-2">
                  <span>{search}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
