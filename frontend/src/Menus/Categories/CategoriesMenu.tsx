import { useEffect, useState } from "react";
import { CategoryAPI } from "../../Api/User/CategoryApi";
import { BackendReturnFuncDto } from "../../Api/UtilsDtos/backend.return.func.dto";
import { CategoryDto } from "../../Api/UtilsDtos/category.dto";
import { Dndfuncs } from "../../components/Functions/Dndfuncs";
import { PrettyHeaderExtendCategory } from "../../components/Prettys/PrettyComponents";
import { HeaderCategoryAlert } from "../../components/Views/Alerts";
import SearchMenuUsersGrid from "../Search/SearchedUsers";

const CategoriesMenu = (props: any) => {
  const [defaultSearchCategories, setDefaultSearchCategories] = useState<
    CategoryDto[]
  >([]);
  const [favoriteCategories, setFavoriteCategories] = useState<CategoryDto[]>(
    []
  );
  const [categoryAlert, setCategoryAlert] =
    useState<BackendReturnFuncDto>(Object);

  const FetchCategories = async () => {
    if (window.localStorage.getItem("access_token")) {
      setFavoriteCategories(
        await CategoryAPI.getUserFavoriteCategories(
          window.localStorage.getItem("access_token")!
        )
      );
    }
    setDefaultSearchCategories(await CategoryAPI.getAllCategories());
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div className="w-full flex flex-row max-h-[60vh] space-x-5">
      <div className="flex min-w-[25vw] 2xl:min-w-[15vw] max-w-[25vw] 2xl:max-w-[15vw] max-h-[60vh] overflow-y-auto scrollbar-hide">
        <div className="w-full h-fit inline-flex items-center justify-center font-bold ">
          <div className="flex flex-col w-full">
            <div className="w-full flex flex-col">
              <div id="CategoryAlert">
                {categoryAlert.success === false && (
                  <HeaderCategoryAlert alert={categoryAlert} />
                )}
              </div>

              <p className="text-gray-200 text-sm pb-3">Favorites</p>
              <div
                onDragOver={(e) => Dndfuncs.OnCategoryDragOver(e)}
                onDrop={(e) =>
                  Dndfuncs.OnCaregoryDrop(
                    e,
                    setFavoriteCategories,
                    favoriteCategories,
                    defaultSearchCategories,
                    setCategoryAlert,
                    "CategoryAlert"
                  )
                }
                className="min-h-[50vh] h-full"
              >
                {favoriteCategories?.map(
                  (category: CategoryDto, categoryIndex: any) => (
                    <button
                      key={categoryIndex}
                      className="relative w-full text-start font-semibold text-white rounded-sm h-[4rem]"
                    >
                      <img
                        src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                        className="object-cover h-full w-full opacity-50 rounded-sm border-2"
                        alt=""
                      />
                      <div className="absolute top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
                        <p className="my-2 text-gray-200 font-bold text-lg">
                          {category?.title}
                        </p>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {props?.searchInputvalue &&
        props?.searchInputvalue.length > 0 &&
        props?.searchedUsers.length > 0 ? (
          <SearchMenuUsersGrid searchedUsers={props?.searchedUsers} />
        ) : (
          <div className="w-full max-h-[60vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-center">
              <div className="columns-1 sm:columns-1 md:columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 3xl:columns-4 4xl:colmuns-5 gap-2 space-y-2 ">
                {defaultSearchCategories.map(
                  (category: CategoryDto, categoryIndex: number) => (
                    <div
                      draggable={true}
                      onDragStart={(e) =>
                        Dndfuncs.DragStarted(e, category, categoryIndex)
                      }
                      key={categoryIndex}
                    >
                      <PrettyHeaderExtendCategory category={category} />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesMenu;
