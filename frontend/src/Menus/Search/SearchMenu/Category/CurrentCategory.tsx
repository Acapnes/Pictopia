import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../../Api/Category/CategoryApi";
import { CategoryDto } from "../../../../Api/Category/CategoryDtos/category.dto";
import { MultiFuncs } from "../../../../components/Functions/MultipleFuncs";
import { PrettyCompassIcon } from "../../../../components/Prettys/PrettyIcons";

const CurrentCategory: React.FC<{}> = () => {
  const [currentCategory, setCurrentCategory] = useState<CategoryDto>(Object);

  const getCategoryByTitle = async () => {
    if ((await MultiFuncs.UrlParam()) !== "explore") {
      setCurrentCategory(
        await CategoryAPI.getCategoryByTitle(
          (await (await MultiFuncs.UrlParam()).charAt(0).toLocaleUpperCase()) +
            (await MultiFuncs.UrlParam()).slice(1)
        )
      );
    }
  };

  useEffect(() => {
    getCategoryByTitle();
  }, []);

  // console.log(currentCategory);

  return (
    <>
      {currentCategory?.title ? (
        <div className="relative min-w-[25vw] 2xl:min-w-[15vw] text-start font-semibold text-white rounded-sm h-[4rem] cursor-pointer">
          <img
            src={`data:${currentCategory?.category_picture_file?.contentType};base64,${currentCategory?.category_picture_file?.data}`}
            className=" object-cover h-full w-full bg-opacity-70 rounded-sm border-2"
            alt=""
          />
          <div className="absolute top-0 w-full h-full text-start flex flex-row space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
            <div>
              <PrettyCompassIcon />
            </div>
            <p className="my-2 text-gray-300 font-bold text-2xl">
              {currentCategory?.title}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative min-w-[25vw] 2xl:min-w-[15vw] text-start font-semibold text-white rounded-sm h-[4rem]">
          <img
            src="/explore.jpg"
            className=" object-none h-full w-full bg-opacity-70 rounded-sm border-2"
            alt=""
          />
          <div className="absolute top-0 w-full h-full text-start flex flex-row space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
            <div>
              <PrettyCompassIcon />
            </div>
            <p className="my-2 text-gray-300 font-bold text-2xl">Explore</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentCategory;
