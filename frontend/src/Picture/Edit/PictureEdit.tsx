import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { PicAPI } from "../../Api/Pic/PicApi";
import { PrettyLargeAvatar } from "../../components/Prettys/PrettyElements";
import { PrettySquareFilledAddIcon } from "../../components/Prettys/PrettyIcons";
import Header from "../../Menus/Header";
import DetailsPicture from "../Details/Card/DetailsPicture";
import CategoryList, {
  CategorySelection,
} from "../Upload/components/Categories";
import { HashtagAppend } from "../Upload/components/Hashtags";

const PictureEdit: React.FC<{}> = () => {
  const [picture, setPicture] = useState<PicDto>(Object);
  const inputHashtagRef = useRef<HTMLInputElement>(null);

  const params = useParams() as any;

  useEffect(() => {
    (async () => {
      setPicture(await PicAPI.getDetailPic(params?.id));
    })();
  }, []);

  return (
    <div className="min-h-screen w-full h-full flex flex-col bg-soft-black">
      <Header />
      <div className="min-h-[70vh] flex flex-col space-y-4 justify-center items-center px-2 py-10">
        <DetailsPicture picture={picture} />
        <div className="w-full lg:max-w-[60vw] 3xl:max-w-[50vw] mb-10 flex flex-col space-y-1">
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5">
            <div className="h-full flex flex-row justify-between space-x-4 bg-soft-black bg-opacity-95 p-5 text-gray-200 ">
              <div className="flex flex-col space-y-2 w-full h-full">
                <div className="flex md:flex-row md:space-x-4 md:space-y-0 md:items-start flex-col space-x-0 space-y-4 items-center">
                  {/* <PrettyLargeAvatar user={picture.authorPic} /> */}
                  <div className="w-full flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <p className="font-bold">
                        <span className="text-pretty-pink">*</span> Title
                      </p>
                      <input
                        type="text"
                        defaultValue={picture?.title}
                        className="w-full font-bold text-2xl break-all overflow-y-auto scrollbar-hide first-letter:uppercase
                      outline-none px-1 py-1.5 bg-gray-200 text-gray-700 border-[1px] border-pretty-pink rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-bold">Description</p>
                      <textarea
                        defaultValue={picture?.description}
                        className="w-full break-all min-h-[10rem] max-h-[20rem] overflow-y-auto  first-letter:uppercase
                          outline-none px-1 py-1.5 bg-gray-200 text-gray-700 border-[1px] border-pretty-pink rounded-sm"
                      />
                    </div>
                    {/* <div className="flex flex-col space-y-1">
                      <p className="font-bold">Categories</p>
                      <CategorySelection
                        categoryArray={picture?.categories}
                        setedCategories={[]}
                        setCategoryArray={function (
                          value: React.SetStateAction<CategoryDto[]>
                        ): void {
                          throw new Error("Function not implemented.");
                        }}
                        setSetedCategories={function (
                          value: React.SetStateAction<CategoryDto[]>
                        ): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </div> */}
                    {/* <button
                      className="bg-red-700 p-1"
                      onClick={() => {
                        setPicture({ ...picture, title: "asd" });
                      }}
                    >
                      deneme
                    </button> */}
                    <div className="flex flex-col space-y-1">
                      <p className="font-bold">Hashtags</p>
                      <HashtagAppend
                        picture={picture}
                        setPicture={setPicture}
                        refInput={inputHashtagRef}
                        advStyle="text-gray-700 bg-gray-200 border-[1px] border-pretty-pink"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureEdit;
