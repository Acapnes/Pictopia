import React, { useEffect, useState } from "react";
import { PicDto } from "../../../Api/Pic/dtos/picDto";
import { CategoryAPI } from "../../../Api/User/CategoryApi";
import { CategoryDto } from "../../../Api/User/CategoryDtos/category.dto";
import {
  PrettySmallArrowDown,
  PrettyTrashIcon,
} from "../../../components/Prettys/PrettyIcons";

const CategorySelection: React.FC<{
  picture: PicDto;
  setPicture: (value: React.SetStateAction<PicDto>) => void;
}> = ({ picture, setPicture }) => {
  const [categoryArray, setCategoryArray] = useState<CategoryDto[]>([]);
  const [showCategoryList, setShowCategoryList] = useState(false);

  const FetchCategories = async () => {
    setCategoryArray(await CategoryAPI.getAllCategories());
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <span className="font-semibold text-gray-200 text-lg">
        Set Categories
      </span>
      <div className="w-full flex flex-row bg-white items-center p-1 space-x-3 rounded-sm">
        <input
          type="dataList"
          className="w-full bg-transparent outline-none rounded-sm"
        />
        <button onClick={() => setShowCategoryList(!showCategoryList)}>
          <PrettySmallArrowDown size={20} fill="rgb(244, 114, 182)" />
        </button>
      </div>
      <CategoryList
        showCategoryList={showCategoryList}
        categoryArray={categoryArray}
        setedCategories={picture?.categories}
        picture={picture}
        setPicture={setPicture}
      />
    </div>
  );
};

const CategoryList: React.FC<{
  showCategoryList: boolean;
  categoryArray: CategoryDto[];
  setedCategories: PicDto["categories"];
  picture: PicDto;
  setPicture: (value: React.SetStateAction<PicDto>) => void;
}> = ({
  showCategoryList,
  categoryArray,
  setedCategories,
  picture,
  setPicture,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {showCategoryList && (
        <div className="w-full max-h-[10rem] overflow-auto scrollbar-hide flex flex-col bg-black rounded-sm">
          {categoryArray?.map(
            (category: CategoryDto, categoryIndex: number) => (
              <div
                onClick={() =>
                  setPicture({
                    ...picture,
                    categories:
                      picture?.categories?.length > 0
                        ? [...picture?.categories, category]
                        : [category],
                  })
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
              <button
                onClick={() => {
                  const updatedCategories = setedCategories.filter(
                    (_, i) => i !== setedCategoryIndex
                  );
                  setPicture({ ...picture, categories: updatedCategories });
                }}
                key={setedCategoryIndex}
                className="relative w-full text-start font-semibold text-white rounded-sm h-[4rem] min-w-[10rem] group"
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
                  <div className="transition duration-500 opacity-0 group-hover:opacity-100">
                    <PrettyTrashIcon fill={"white"} size={18} />
                  </div>
                </div>
              </button>
            )
          )}
      </div>
    </div>
  );
};

export default CategoryList;

export { CategorySelection };
