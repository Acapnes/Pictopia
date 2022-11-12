import { useEffect, useState } from "react";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import {
  PrettySearchIcon,
  PrettySmallArrowUpIcon,
} from "../../components/Prettys/PrettyIcons";
import { CategoryDto } from "../../Api/UtilsDtos/category.dto";
import { CategoryAPI } from "../../Api/User/CategoryApi";
import { UserAPI } from "../../Api/User/UserApi";
import LastSearchs from "./LastSearchs";
import CategoriesMenu from "../Categories/CategoriesMenu";
import CurrentCategory from "../Categories/CurrentCategory";

const SearchBar = (props: any) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [searchInputvalue, setSearchInputvalue] = useState<string>();
  const [searchedCategories, setFetchedSearchedCategories] = useState<CategoryDto[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<UserDto[]>([]);

  const fetchAndSetPicsAndUsers = async () => {
    setFetchedSearchedCategories(await CategoryAPI.getAllCategories());
  };

  const searchUsers = async (username: string) => {
    setSearchedUsers(await UserAPI.findUserByUsername(username));
  };

  useEffect(() => {
    fetchAndSetPicsAndUsers();
  }, []);

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
              <div className="w-full flex flex-col space-y-3">
                <div className="w-full flex flex-row justify-between space-x-5">
                  <CurrentCategory />
                  <LastSearchs />
                </div>
                <div className="w-full h-full">
                  <CategoriesMenu
                    showSearchMenu={showSearchMenu}
                    searchedUsers={searchedUsers}
                    searchInputvalue={searchInputvalue}
                    searchedCategories={searchedCategories}
                  />
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
