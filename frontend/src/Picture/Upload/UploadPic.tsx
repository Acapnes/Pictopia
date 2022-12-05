import React from "react";
import { useState } from "react";
import { PicAPI } from "../../Api/Pic/PicApi";
import { UploadPicDto } from "../../Api/Pic/dtos/uploadPicDto";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import { PrettyUploadIcon } from "../../components/Prettys/PrettyIcons";
import Header from "../../Menus/Header";
import SelectPicture from "./components/SelectPicture";
import CategorySelection from "./components/Category/CategorySelection";
import HashtagList from "./components/Hashtags/HashtagList";
import Hashtag from "./components/Hashtags/Hashtag";
import { CategoryDto } from "../../Api/User/CategoryDtos/category.dto";
import { useToastStore } from "../../components/Zustand/store";
import { ReturnFuncDto } from "../../Api/Utils/dtos/ReturnFuncDto";

const UploadPic: React.FC<{}> = () => {
  const setToastState = useToastStore((state: any) => state.setToastState);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const [inputHashtag, setInputHashtag] = useState("");
  const [hashtagArray, setHashtagArray] = useState<string[]>([]);

  const [picture, setPicture] = useState<any>(Object);
  const [imageURL, setImageURL] = useState<any>("null");

  const [categoryArray, setCategoryArray] = useState<CategoryDto[]>([]);
  const [setedCategories, setSetedCategories] = useState<CategoryDto[]>([]);

  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = () => {
    hiddenFileInput.current
      ? hiddenFileInput.current.click()
      : alert("Something went wrong! Please try again..");
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    setPicture(fileUploaded);
    setImageURL(URL.createObjectURL(fileUploaded));
  };

  const uploadPicture = async () => {
    if (window.localStorage.getItem("access_token")) {
      await PicAPI.uploadPicture(
        {
          picture: picture,
          title: inputTitle,
          description: inputDescription,
          categories: setedCategories,
          hashTags: hashtagArray,
        } as UploadPicDto,
        window.localStorage.getItem("access_token")!
      ).then(
        async (UploadResp: ReturnFuncDto) =>
          await setToastState(UploadResp.message)
      );
    }
  };

  return (
    <div className="min-h-screen w-full h-full bg-soft-black flex flex-col md:pb-3">
      <div className="flex-none">
        <Header />
      </div>
      <div className="w-full flex-auto flex items-center justify-center">
        <div className="w-[50rem] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-0.5 md:shadow-2xl">
          <div className="w-full flex flex-col space-y-4 px-5 pb-6 pt-4 bg-soft-black rounded-sm">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-200 text-lg">
                *Title
              </span>
              <div className="w-full items-center space-x-3 rounded-sm">
                <input
                  onChange={(e) => setInputTitle(e.target.value)}
                  className="w-full outline-none rounded-sm p-1"
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <SelectPicture
                imageURL={imageURL}
                handleClick={handleClick}
                setImageURL={setImageURL}
              />
            </div>
            <CategorySelection
              categoryArray={categoryArray}
              setedCategories={setedCategories}
              setCategoryArray={setCategoryArray}
              setSetedCategories={setSetedCategories}
            />
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-200 text-lg">
                Description
              </span>
              <textarea
                onChange={(e) => setInputDescription(e.target.value)}
                className="min-h-[5vh] max-h-[15vh] outline-none rounded-sm p-1"
                maxLength={2000}
              ></textarea>
            </div>
            <Hashtag
              inputHashtag={inputHashtag}
              hashtagArray={hashtagArray}
              setInputHashtag={setInputHashtag}
              setHashtagArray={setHashtagArray}
            />
            <HashtagList
              hashtags={hashtagArray}
              setHashtagArray={setHashtagArray}
            />
            <div className="w-full flex justify-end flex-row space-x-4 items-center">
              <button onClick={() => uploadPicture()}>
                <PrettyRainbow>
                  <div className="flex flex-row space-x-1.5 items-center">
                    <span className="text-gray-200">Send</span>
                    <PrettyUploadIcon />
                  </div>
                </PrettyRainbow>
              </button>
            </div>
          </div>
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={hiddenFileInput}
          accept="image/jpg, image/jpeg, image/png, image/webp, image/jfif"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UploadPic;
