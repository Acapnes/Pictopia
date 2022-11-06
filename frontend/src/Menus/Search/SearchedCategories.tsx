import { CategoryDto } from "../../Api/UtilsDtos/category.dto";
import { PrettyCheckIcon } from "../../components/Prettys/PrettyIcons";
const SearchedCategories = (props: any) => {
  return (
    <div className="w-full max-h-[60vh] overflow-y-auto scrollbar-hide">
      <div className="flex justify-center">
        <div className="columns-1 sm:columns-1 md:columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 3xl:columns-4 4xl:colmuns-5 gap-4 ">
          {props.initFetchedSearchCategories.map(
            (category: CategoryDto, categoryIndex: number) => (
              <button
                key={categoryIndex}
                className="relative w-full text-start font-semibold text-white rounded-sm h-[20rem]"
              >
                <img
                  src={`data:${category.category_picture_file.contentType};base64,${category.category_picture_file.data}`}
                  className="object-cover h-full w-full opacity-50 rounded-sm border-2"
                  alt=""
                />
                <div className="absolute hover:text-pretty-pink top-0 w-full h-full flex flex-row justify-center space-x-2 items-center text-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
                  <p className="my-2 text-gray-200 font-bold text-xl">
                    {category.title}
                  </p>
                  <div>
                    <PrettyCheckIcon />
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchedCategories;
