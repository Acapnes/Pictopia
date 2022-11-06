import { useEffect, useState } from "react";
import { PicAPI } from "../../Api/PicApi";
import { PicDto } from "../../Api/PicDtos/picDto";
import { UserAPI } from "../../Api/UserApi";
import { UserDto } from "../../Api/UserDtos/userDto";
import {
  PrettySearchIcon,
  PrettySmallArrowUpIcon,
} from "../../components/Prettys/PrettyIcons";
import SearchedCategories from "./SearchedCategories";
import Categories from "../components/Categories";
import { CategoryAPI } from "../../Api/CategoryApi";
import { CategoryDto } from "../../Api/UtilsDtos/category.dto";
import SearchMenuUsersGrid from "./SearchedUsers";

const SearchBar = (props: any) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [searchInputvalue, setSearchInputvalue] = useState<string>();
  const [initfetchedSearchCategories, setInitFetchedSearchedCategories] =
    useState<CategoryDto[]>([]);

  const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);
  const [searchfetchedPics, setSearchFetchedPics] = useState<PicDto[]>([]);

  const fetchAndSetPicsAndUsers = async () => {
    setInitFetchedSearchedCategories(await CategoryAPI.getAllCategories());
  };

  const searchUsers = async (username: string) => {
    setSearchedUsers(await UserAPI.findUserByUsername(username));
  };

  useEffect(() => {
    fetchAndSetPicsAndUsers();
  }, []);

  return (
    <div className="w-full hidden sm:flex sm:items-center relative">
      <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-semibold overflow-hidden rounded-sm">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
        <span className=" w-full px-4 md:py-2 sm:py-1 transition-all ease-out bg-gray-900 rounded-sm duration-400 relative">
          <div
            onClick={() => setShowSearchMenu(true)}
            className="flex flex-row justify-between space-x-2"
          >
            <div className="h-full flex items-center mt-[0.25rem]">
              <PrettySearchIcon />
            </div>
            <input
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
              <PrettySmallArrowUpIcon size={18}/>
            </div>
          )}
        </span>
      </div>
      {showSearchMenu && (
        <div className={`absolute top-[4rem] w-full`}>
          <div className="w-full h-full">
            <div className="w-full p-0.5 inline-flex items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
              <div className=" w-full p-5 bg-soft-black bg-opacity-95 rounded-sm relative">
                <div className="w-full flex flex-row max-h-[60vh] space-x-5">
                  <Categories />

                  <div className="w-full flex flex-col space-y-2">
                    <div className="w-full flex flex-row space-x-2 border-b-2 pb-3 border-pretty-pink">
                      <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
                        <div className="px-2.5 py-1">
                          <span>Vikings</span>
                        </div>
                      </button>
                      <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
                        <div className="px-2.5 py-1">
                          <span>Movies</span>
                        </div>
                      </button>
                      <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
                        <div className="px-2.5 py-1">
                          <span>Daily</span>
                        </div>
                      </button>
                    </div>
                    {searchInputvalue && searchedUsers.length > 0 ? (
                      <SearchMenuUsersGrid searchedUsers={searchedUsers} />
                    ) : (
                      <SearchedCategories
                        initFetchedSearchCategories={
                          initfetchedSearchCategories
                        }
                      />
                    )}
                  </div>
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
