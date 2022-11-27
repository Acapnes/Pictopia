import { useEffect, useState } from "react";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import {
  PrettySearchIcon,
  PrettySmallArrowUpIcon,
} from "../../components/Prettys/PrettyIcons";
import { CategoryDto } from "../../Api/Category/CategoryDtos/category.dto";
import { CategoryAPI } from "../../Api/Category/CategoryApi";
import { UserAPI } from "../../Api/User/UserApi";
import LastSearchs from "./SearchMenu/components/LastSearchs";
import CurrentCategory from "./SearchMenu/Category/CurrentCategory";
import { usePictopiaDNDStore } from "../../components/Zustand/store";
import DefaultCategories from "./SearchMenu/Category/DefaultCategories";
import FavoriteCategories from "./SearchMenu/Category/FavoriteCategories";
import SearchMenuUsersGrid from "./SearchMenu/Users/SearchedUsers";

const SearchBar: React.FC<{}> = () => {
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
                if (e.key === "Enter") console.log("asd");
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
              placeholder="search"
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
            <div className=" w-full p-5 bg-soft-black bg-opacity-95 rounded-sm relative">
              <div className="w-full flex flex-row space-x-2">
                <div className="flex flex-col space-y-2 w-fit">
                  <CurrentCategory />
                  <FavoriteCategories favoriteCategories={favoriteCategories} />
                </div>
                <div className="min-h-[60vh] h-full w-full flex flex-col space-y-2">
                  <LastSearchs />
                  {searchInputvalue ? (
                    <SearchMenuUsersGrid searchedUsers={searchedUsers} />
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
