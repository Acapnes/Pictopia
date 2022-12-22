import React, { useEffect, useState } from "react";
import { PicDto } from "../../../Api/Pic/dtos/picDto";
import { CategoryAPI } from "../../../Api/User/CategoryApi";
import { CategoryDto } from "../../../Api/User/CategoryDtos/category.dto";
import { PrettyRotatingArrow } from "../../../components/Prettys/PrettyElements";
import {
  PrettyErrorIcon,
  PrettyHelpIcon,
  PrettyTrashIcon,
} from "../../../components/Prettys/PrettyIcons";

const CategorySelection: React.FC<{
  advStyle?: string;
  picture: PicDto;
  setPicture: (value: React.SetStateAction<PicDto>) => void;
}> = ({ picture, setPicture, advStyle }) => {
  const [categoryArray, setCategoryArray] = useState<CategoryDto[]>([]);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [categorySearchInput, setCategorySearchInput] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (categorySearchInput?.length) {
        setCategoryArray(
          await CategoryAPI.searchInCategories(categorySearchInput!)
        );
        setShowCategoryList(true);
      } else setCategoryArray(await CategoryAPI.getAllCategories());
    })();
  }, [categorySearchInput]);

  return (
    <div className="flex flex-col space-y-1">
      <span className="font-semibold text-gray-200 text-lg">
        Set Categories
      </span>
      <div
        className={`w-full flex flex-row bg-white items-center p-1 space-x-3 rounded-sm ${advStyle}`}
      >
        <input
          onChange={(e) => setCategorySearchInput(e.target.value)}
          type="dataList"
          className="w-full bg-transparent outline-none rounded-sm"
        />
        <button onClick={() => setShowCategoryList(!showCategoryList)}>
          <PrettyRotatingArrow
            state={showCategoryList}
            size={20}
            fill="rgb(244, 114, 182)"
          />
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
    <div className="flex flex-col">
      {showCategoryList &&
        (categoryArray.length > 0 ? (
          <div className="w-full max-h-[10rem] overflow-auto scrollbar-hide flex flex-wrap items-center bg-extra-light-soft-black rounded-sm border-2 border-pretty-pink">
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
                  className={`relative h-[3rem] min-w-[50%] md:min-w-[33.3%] 2xl:min-w-[25%]
                 4xl:min-w-[20%] group transition duration-150 text-gray-200 cursor-pointer
                 hover:scale-110 rounded-sm `}
                >
                  <img
                    src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                    className="object-cover h-full w-full opacity-30 rounded-sm"
                    alt=""
                  />
                  <div className="absolute top-0 right-1/2 translate-x-1/2 translate-y-1/2">
                    <span className="font-bold text-gray-200">
                      {category.title}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="w-full flex flex-row space-x-1.5 items-center justify-center py-3 bg-light-soft-black rounded-sm">
            <PrettyErrorIcon size={16} fill={"white"} />
            <span className="text-gray-200 font-semibold">
              No Categories Found
            </span>
          </div>
        ))}

      {setedCategories?.length > 0 && (
        <div className="pt-1.5 flex flex-col space-y-1">
          <div className="flex flex-row space-x-1 items-center">
            <PrettyHelpIcon size={15} />
            <p className="font-bold text-gray-200 text-lg">Seted Categories</p>
          </div>
          <div
            className={`w-full flex flex-col space-y-1 max-h-[21rem] overflow-auto scrollbar-hide`}
          >
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
      )}
    </div>
  );
};

export { CategorySelection };
