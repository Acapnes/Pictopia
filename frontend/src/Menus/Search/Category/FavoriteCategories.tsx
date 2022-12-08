import React from "react";
import { CategoryAPI } from "../../../Api/User/CategoryApi";
import { CategoryDto } from "../../../Api/User/CategoryDtos/category.dto";
import { PrettySmallArrowUpIcon } from "../../../components/Prettys/PrettyIcons";
import { usePictopiaDNDStore } from "../../../components/Zustand/store";
const FavoriteCategories: React.FC<{ favoriteCategories: CategoryDto[] }> = ({
  favoriteCategories,
}) => {
  const setFavoriteCategories = usePictopiaDNDStore(
    (state: any) => state.setFavoriteCategories
  );
  const defaultCategories = usePictopiaDNDStore(
    (state: any) => state.defaultCategories
  );
  const setDraggingNumber = usePictopiaDNDStore(
    (state: any) => state.setDraggingNumber
  );
  const draggingNumber = usePictopiaDNDStore(
    (state: any) => state.draggingNumber
  );
  return (
    <div className="flex min-w-[25vw] 2xl:min-w-[15vw] max-w-[25vw] 2xl:max-w-[15vw] max-h-[60vh] overflow-y-auto scrollbar-hide">
      <div className="w-full h-fit inline-flex items-center justify-center font-bold">
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-col">
            <p className="text-gray-200 text-sm pb-3">Favorites</p>
            <div
              onDragOver={(e) => draggingNumber !== 1 && e.preventDefault()}
              onDrop={async (droppedCategory) => {
                const category = JSON.parse(
                  droppedCategory.dataTransfer.getData("category")
                ) as CategoryDto;
                const categoryIndex = JSON.parse(
                  droppedCategory.dataTransfer.getData("categoryIndex")
                ) as number;
                await CategoryAPI.AddFavoriteCategory(category._id).then(
                  async (resp) => {
                    if (resp.success) {
                      setFavoriteCategories([...favoriteCategories, category]);
                      defaultCategories.splice(categoryIndex, 1);
                      return;
                    }
                  }
                );
              }}
              className="min-h-[50vh] h-full relative"
            >
              <FavoriteDropHelper categoryLength={favoriteCategories.length} />
              {favoriteCategories?.map(
                (category: CategoryDto, categoryIndex: any) => (
                  <div
                    onClick={() =>
                      (window.location.href = `/category/${category.title.toLocaleLowerCase()}`)
                    }
                    draggable={true}
                    onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
                      setDraggingNumber(1);
                      event.dataTransfer.setData(
                        "category",
                        JSON.stringify(category)
                      );
                      event.dataTransfer.setData(
                        "categoryIndex",
                        JSON.stringify(categoryIndex)
                      );
                    }}
                    key={categoryIndex}
                    className="relative w-full mb-1.5 text-start font-semibold text-white rounded-sm h-[4rem] min-w-[8rem] cursor-pointer"
                  >
                    <img
                      src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                      className="object-cover h-full w-full opacity-75 rounded-sm border-2"
                      alt=""
                    />
                    <div className="absolute top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-4 py-2 rounded-sm duration-300 bg-light-soft-black hover:bg-rough-soft-black bg-opacity-30 hover:bg-opacity-50">
                      <p className="my-2 text-gray-200 font-bold text-lg">
                        {category?.title}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCategories;

export const FavoriteDropHelper: React.FC<{ categoryLength: number }> = ({
  categoryLength,
}) => {
  return (
    <>
      {categoryLength <= 0 && (
        <div className="absolute top-0 w-full h-full z-20 border-dashed border-2 border-pretty-pink select-none">
          <div className="w-full h-full flex items-center justify-center text-center text-gray-200">
            <div className="w-full flex flex-col space-y-2 items-center justify-center">
              <PrettySmallArrowUpIcon />
              <span className="text-md">Drag your favorite categories</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
