import { useEffect, useState } from "react";
import { CategoryAPI } from "../../Api/User/CategoryApi";
import { CategoryDto } from "../../Api/UtilsDtos/category.dto";
import { PrettyCheckIcon } from "../../components/Prettys/PrettyIcons";
import CurrentCategory from "./CurrentCategory";

const FavoriteCategories = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const FetchCategories = async () => {
    if (window.localStorage.getItem("access_token")) {
      setCategories(
        await CategoryAPI.getUserFavoriteCategories(
          window.localStorage.getItem("access_token")!
        )
      );
    }
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div className="flex min-w-[25vw] 2xl:min-w-[15vw] max-h-[60vh] overflow-y-auto scrollbar-hide">
      <div className="w-full h-fit inline-flex items-center justify-center font-bold ">
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-col space-y-3">
            <CurrentCategory />
            <p className="text-gray-200 text-sm">Favorites</p>
            <div className="h-full">
              {categories.map((category, categoryIndex) => (
                <button
                  key={categoryIndex}
                  className="relative w-full text-start font-semibold text-white rounded-sm h-[4rem]"
                >
                  <img
                    src={`data:${category.category_picture_file.contentType};base64,${category.category_picture_file.data}`}
                    className="object-cover h-full w-full opacity-50 rounded-sm border-2"
                    alt=""
                  />
                  <div className="absolute top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
                    <p className="my-2 text-gray-200 font-bold text-lg">
                      {category.title}
                    </p>
                    <div>
                      <PrettyCheckIcon />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCategories;
