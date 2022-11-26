import React from "react";
import { CategoryDto } from "../../../../Api/Category/CategoryDtos/category.dto";

const CategoryList: React.FC<{
  showCategoryList: boolean;
  categoryArray: CategoryDto[];
  setedCategories: CategoryDto[];
  setSetedCategories: React.Dispatch<React.SetStateAction<CategoryDto[]>>;
}> = ({
  showCategoryList,
  categoryArray,
  setedCategories,
  setSetedCategories,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {showCategoryList && (
        <div className="w-full max-h-[10rem] overflow-auto scrollbar-hide flex flex-col bg-black rounded-sm">
          {categoryArray?.map(
            (category: CategoryDto, categoryIndex: number) => (
              <div
                onClick={() =>
                  setSetedCategories([...setedCategories, category])
                }
                key={categoryIndex}
                className="text-gray-200 py-2 px-1 cursor-pointer hover:bg-pretty-rough-pink"
              >
                {category.title}
              </div>
            )
          )}
        </div>
      )}
      <div className="w-full flex flex-col space-y-2 xl:flex-row xl:space-x-2 xl:space-y-0 overflow-auto scrollbar-hide">
        {setedCategories?.length > 0 &&
          setedCategories?.map(
            (setedCategory: CategoryDto, setedCategoryIndex: number) => (
              <div
                key={setedCategoryIndex}
                className="relative w-full text-start font-semibold text-white rounded-sm h-[4rem] min-w-[10rem]"
              >
                <img
                  src={`data:${setedCategory?.category_picture_file?.contentType};base64,${setedCategory?.category_picture_file?.data}`}
                  className="object-cover h-full w-full opacity-50 rounded-sm border-2"
                  alt=""
                />
                <div className="absolute top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
                  <p className="my-2 text-gray-200 font-bold text-lg">
                    {setedCategory?.title}
                  </p>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default CategoryList;