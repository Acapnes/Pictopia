import React, { useEffect, useState } from "react";
import { CategoryAPI } from "../../../../Api/Category/CategoryApi";
import { CategoryDto } from "../../../../Api/Category/CategoryDtos/category.dto";
import { PrettySmallArrowDown } from "../../../../components/Prettys/PrettyIcons";
import CategoryList from "./CategoryList";

const CategorySelection: React.FC<{
  categoryArray: CategoryDto[];
  setedCategories: CategoryDto[];
  setCategoryArray: React.Dispatch<React.SetStateAction<CategoryDto[]>>;
  setSetedCategories: React.Dispatch<React.SetStateAction<CategoryDto[]>>;
}> = ({
  setSetedCategories,
  categoryArray,
  setedCategories,
  setCategoryArray,
}) => {
  const [showCategoryList, setShowCategoryList] = useState(false);

  const FetchCategories = async () => {
    setCategoryArray(await CategoryAPI.getAllCategories());
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col space-y-1">
        <span className="font-semibold text-gray-200 text-lg">
          *Set Categories
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
          setedCategories={setedCategories}
          setSetedCategories={setSetedCategories}
        />
      </div>
    </div>
  );
};

export default CategorySelection;
