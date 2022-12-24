import React, { useEffect, useRef, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";
import Header from "../Header";
import { SearchMenuUsersGrid, SearchResults } from "../Search/SearchBar";
import { PrettyRainbowDiv } from "../../components/Prettys/PrettyComponents";
import { usePictopiaDNDStore } from "../../components/Zustand/store";
import { CategoryDto } from "../../Api/User/CategoryDtos/category.dto";
import { PrettyPenIcon } from "../../components/Prettys/PrettyIcons";

const SearchView: React.FC<{}> = () => {
  const [userCredentials, setUserCredentials] = useState<UserDto>(Object);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchedResults, setSearchedResults] = useState<
    UserDto[] | CategoryDto[] | any
  >([]);

  const searchByInput = async (input: string) => {
    setSearchedResults([
      await UserAPI.findUserByUsername(input),
      // await CategoryAPI.searchInCategories(input),
    ]);
  };

  const initFetchCredentials = async () => {
    const access_token = window.localStorage.getItem("access_token") as string;
    setUserCredentials(await UserAPI.fetchUserCredentials(access_token));
  };

  useEffect(() => {
    initFetchCredentials();
    searchInputRef.current!.value = "";
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-soft-black">
      <Header />
      <div className="w-full h-full flex flex-col space-y-2 items-center pt-3 px-3 text-gray-200">
        <p className="font-bold text-xl text-gray-200">Search In Everything</p>
        <PrettyRainbowDiv advStyle="w-full">
          <input
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                searchInputRef.current?.value?.length &&
                searchInputRef.current?.value?.length > 0
              ) {
                if (searchInputRef.current?.value[0] === "#") {
                  window.location.href = `/search/tags/${searchInputRef.current?.value.slice(
                    1,
                    searchInputRef.current?.value.length
                  )}`;
                } else {
                  window.location.href = `/search/${searchInputRef.current?.value}`;
                }
              }
            }}
            onChange={() => {
              searchInputRef.current?.value! &&
                searchByInput(searchInputRef.current?.value!);
            }}
            ref={searchInputRef}
            type="text"
            className="w-full h-full bg-transparent text-gray-200 outline-none"
          />
        </PrettyRainbowDiv>
        <div className="w-full flex flex-col space-y-3">
          <SearchResultMenu
            inputRef={searchInputRef}
            searchedUsers={searchedResults[0]}
            searchedCategories={searchedResults[1]}
          />
          <div className="w-full">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;

const SearchResultMenu: React.FC<{
  inputRef: any;
  searchedUsers: UserDto[];
  searchedCategories: CategoryDto[];
}> = ({ inputRef, searchedUsers, searchedCategories }) => {
  return (
    <div className="w-full">
      {inputRef.current?.value! && (
        <div className="w-full flex flex-col space-y-2 max-h-[50vh]">
          <SearchResults searchInput={inputRef.current?.value!} />
          <SearchMenuUsersGrid searchedUsers={searchedUsers} />
        </div>
      )}
    </div>
  );
};

const Categories: React.FC<{}> = () => {
  const favoriteCategories = usePictopiaDNDStore(
    (state: any) => state.favoriteCategories
  );

  return (
    <div className="flex flex-col space-y-1 pb-3">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-1">
          <span className="text-pretty-pink">*</span>
          <p className="text-gray-200 font-bold">Favorite Categories</p>
        </div>
        <div>
          <button className="px-1.5 py-1 rounded-sm focus:bg-extra-light-soft-black transition duration-200">
            <PrettyPenIcon size={12} fill="rgb(244, 114, 182)" />
          </button>
        </div>
      </div>
      {favoriteCategories?.map(
        (category: CategoryDto, categoryIndex: number) => (
          <a
            href={`/category/${category.title.toLocaleLowerCase()}`}
            key={categoryIndex}
            className="relative w-full text-start font-semibold text-white rounded-sm h-[3rem] cursor-pointer"
          >
            <img
              src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
              className="object-cover h-full w-full opacity-60 rounded-sm"
              alt=""
            />
            <div className="absolute top-0 w-full h-full flex flex-row items-center justify-center rounded-sm bg-light-soft-black bg-opacity-30">
              <p className="text-gray-200 font-bold text-lg">
                {category?.title}
              </p>
            </div>
          </a>
        )
      )}
    </div>
  );
};
