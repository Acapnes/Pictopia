import { Masonry } from "@mui/lab";
import React from "react";
import { CategoryAPI } from "../../../Api/User/Category/CategoryApi";
import { CategoryDto } from "../../../Api/User/Category/categoryDtos";
import { usePictopiaPublicAccountStore } from "../../../components/Zustand/store";

const DefaultCategories: React.FC<{ defaultCategories: CategoryDto[] }> = ({
  defaultCategories,
}) => {
  
  const setDefaultCategories = usePictopiaPublicAccountStore(
    (state: any) => state.setDefaultCategories
  );

  const setDraggingNumber = usePictopiaPublicAccountStore(
    (state: any) => state.setDraggingNumber
  );

  const draggingNumber = usePictopiaPublicAccountStore(
    (state: any) => state.draggingNumber
  );

  const favoriteCategories = usePictopiaPublicAccountStore<CategoryDto[]>(
    (state: any) => state.favoriteCategories
  );

  return (
    <div
      className="w-full flex flex-auto"
      onDragOver={(e) => draggingNumber !== 0 && e.preventDefault()}
      onDrop={async(droppedCategory) => {
        const category = JSON.parse(droppedCategory.dataTransfer.getData("category")) as CategoryDto;
        const categoryIndex = JSON.parse(droppedCategory.dataTransfer.getData("categoryIndex")) as number;
        await CategoryAPI.RemoveFavoriteCategory(category._id).then(async (resp) => {
          if (resp.success) {
            setDefaultCategories([...defaultCategories, category]);
            favoriteCategories.splice(categoryIndex, 1);
            return;
          }
        });
      }}
    >
      <div className="w-full max-h-[60vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-center">
          <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 5 }} spacing={1}>
            {defaultCategories.map(
              (category: CategoryDto, categoryIndex: number) => (
                <button
                  onClick={() =>
                    (window.location.href = `/category/${category.title.toLocaleLowerCase()}`)
                  }
                  draggable={true}
                  onDragStart={(event: React.DragEvent<HTMLButtonElement>) => {
                    setDraggingNumber(0)
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
                  className="relative w-full text-start font-semibold text-white rounded-sm max-h-[18rem] cursor-pointer"
                >
                  <img
                    src={`data:${category?.category_picture_file?.contentType};base64,${category?.category_picture_file?.data}`}
                    className="object-cover h-full w-full opacity-50 rounded-sm border-2"
                    alt=""
                  />
                  <div className="absolute top-0 w-full h-full flex flex-row justify-center space-x-2 items-center text-center px-4 py-2 rounded-lg duration-300 hover:bg-soft-black hover:bg-opacity-30">
                    <p className="my-2 text-gray-200 font-bold text-xl ">
                      {category?.title}
                    </p>
                  </div>
                </button>
              )
            )}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default DefaultCategories;
