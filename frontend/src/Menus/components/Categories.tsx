import { useEffect, useState } from "react";
import { CategoryAPI } from "../../Api/CategoryApi";
import { CategoryDto } from "../../Api/Utils/category.dto";
import { PrettySearchCategories } from "../../components/PrettyButtons";
import {
  PrettyCheck,
  PrettyCompass,
  PrettyX,
} from "../../components/PrettyIcons";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const FetchCategories = async () => {
    setCategories(await CategoryAPI.getAllCategories());
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div className="fixed top-[5.5rem] left-5 z-20 rounded-md">
      <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden rounded-md">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
        <span className=" w-full relative bg-gray-900 rounded-md duration-400">
          <div className="flex flex-col  gap-4 py-2 px-5 w-[19rem]">
            <div className="w-full flex flex-col h-[70vh] space-y-3 pt-2">
              <div className="mb-2">
                <PrettySearchCategories />
              </div>
              <button className="relative w-full text-start font-semibold text-white rounded-md h-[4rem]">
                <img
                  src="/explore.jpg"
                  className=" object-none h-full w-full opacity-70 rounded-md border-2"
                  alt=""
                />
                <div className="absolute top-0 w-full h-full text-start flex flex-row space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-[#f472b6] hover:bg-opacity-30">
                  <div>
                    <PrettyCompass />
                  </div>
                  <p className="my-2 text-gray-300 font-bold text-2xl">
                    Explore
                  </p>
                </div>
              </button>
              <div className=""></div>
              <p className="text-gray-200 text-sm">Favorites</p>

              <div className="h-full overflow-y-auto scrollbar-hide">
                {categories.map((category, categoryIndex) => (
                  <button
                    key={categoryIndex}
                    className="relative w-full text-start font-semibold text-white rounded-md h-[4rem]"
                  >
                    <img
                      src={`data:${category.category_picture_file.contentType};base64,${category.category_picture_file.data}`}
                      className="object-cover h-full w-full opacity-40 rounded-md border-2"
                      alt=""
                    />
                    <div className="absolute top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
                      <p className="my-2 text-gray-200 font-bold text-lg">
                        {category.title}
                      </p>
                      <div>
                        <PrettyCheck />
                        {/* <PrettyX/> */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className=""></div>
              <hr className="border-gray-600 border-2" />
              <p className="text-gray-200 text-sm">You can Like</p>
              <div className="h-full overflow-y-auto scrollbar-hide">
                {categories.map((category, categoryIndex) => (
                  <button
                    key={categoryIndex}
                    className="relative w-full text-start font-semibold text-white rounded-md h-[4rem]"
                  >
                    <img
                      src={`data:${category.category_picture_file.contentType};base64,${category.category_picture_file.data}`}
                      className="object-cover h-full w-full opacity-40 rounded-md border-2"
                      alt=""
                    />
                    <div className="absolute top-0 w-full h-full text-start flex flex-row justify-between space-x-2 items-center px-4 py-2 rounded-lg duration-300 hover:bg-gray-400 hover:bg-opacity-30">
                      <p className="my-2 text-gray-200 font-bold text-lg">
                        {category.title}
                      </p>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="rgb(15, 191, 80)"
                          className="bi bi-check-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>

                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="rgb(15, 191, 80)"
                          className="bi bi-x-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg> */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Categories;
