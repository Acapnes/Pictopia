import React, { useRef } from "react";
import { useState } from "react";
import { PicAPI } from "../../Api/Pic/PicApi";
import { UploadPicDto } from "../../Api/Pic/dtos/uploadPicDto";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import {
  PrettyPictureIcon,
  PrettyTrashIcon,
  PrettyUploadIcon,
} from "../../components/Prettys/PrettyIcons";
import Header from "../../Menus/Header";
import { CategoryDto } from "../../Api/User/CategoryDtos/category.dto";
import { useToastStore } from "../../components/Zustand/store";
import { ReturnFuncDto } from "../../Api/Utils/ReturnFuncDto";
import { HashtagAppend } from "./components/Hashtags";
import { CategorySelection } from "./components/Categories";
import { PicDto } from "../../Api/Pic/dtos/picDto";

const UploadPic: React.FC<{}> = () => {
  const setToastState = useToastStore((state: any) => state.setToastState);

  const inputHashtagRef = useRef<HTMLInputElement>(null);

  const [imageURL, setImageURL] = useState<any>("null");

  const [uploadPicture, setUploadPicture] = useState<PicDto>(Object);

  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = () => {
    hiddenFileInput.current
      ? hiddenFileInput.current.click()
      : alert("Something went wrong! Please try again..");
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    setUploadPicture({ ...uploadPicture, picture_file: fileUploaded });
    setImageURL(URL.createObjectURL(fileUploaded));
  };

  const uploadPictureFunction = async () => {
    await PicAPI.uploadPicture(
      {
        picture: uploadPicture!.picture_file,
        title: uploadPicture!.title,
        description: uploadPicture?.description,
        categories: uploadPicture?.categories,
        hashTags: uploadPicture?.hashTags,
      } as UploadPicDto,
      window.localStorage.getItem("access_token")!
    ).then(
      async (UploadResp: ReturnFuncDto) =>
        await setToastState(UploadResp.message)
    );
  };

  return (
    <div className="min-h-screen w-full h-full bg-soft-black flex flex-col md:pb-3">
      <Header />
      <div className="w-full flex-auto flex items-center justify-center pt-5">
        <div className="w-[50rem] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm p-0.5">
          <div className="w-full flex flex-col space-y-2 px-5 pb-6 pt-4 bg-soft-black rounded-sm">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-200 text-lg">
                *Title
              </span>
              <div className="w-full items-center space-x-3 rounded-sm">
                <input
                  onChange={(e) =>
                    setUploadPicture({
                      ...uploadPicture,
                      title: e.target.value,
                    })
                  }
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
              picture={uploadPicture}
              setPicture={setUploadPicture}
            />
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-200 text-lg">
                Description
              </span>
              <textarea
                onChange={(e) =>
                  setUploadPicture({
                    ...uploadPicture,
                    description: e.target.value,
                  })
                }
                className="min-h-[5vh] max-h-[15vh] outline-none rounded-sm p-1"
                maxLength={2000}
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-200 text-lg">
                Hashtags
              </span>
              <HashtagAppend
                refInput={inputHashtagRef}
                picture={uploadPicture}
                setPicture={setUploadPicture}
              />
            </div>
            <div className="w-full flex justify-end flex-row space-x-4 items-center">
              <button onClick={() => uploadPictureFunction()}>
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

const SelectPicture: React.FC<{
  imageURL: any;
  handleClick: Function;
  setImageURL: any;
}> = ({ imageURL, handleClick, setImageURL }) => {
  return (
    <div className="w-full flex items-center justify-center pt-1">
      {imageURL === "null" ? (
        <div className="w-full py-5 bg-black rounded-sm object-contain border-[1px] border-pretty-rough-pink flex flex-col space-y-3 items-center justify-center">
          <PrettyPictureIcon fill="white" size={40} />
          <p className="text-gray-200 ">Choose a picture to upload</p>
          <button onClick={() => handleClick()} className="outline-none">
            <PrettyRainbow>
              <span className="text-gray-200">Choose a File...</span>
            </PrettyRainbow>
          </button>
          <p className="text-gray-200 font-light text-sm">
            Supports with PNG, JPG, JPEG, WEBP, JFIF
          </p>
        </div>
      ) : (
        <div className="relative">
          <img
            id="UploadPicture"
            src={imageURL}
            alt=""
            className="object-contain rounded-sm max-h-[100vh]"
          />
          <button
            onClick={() => setImageURL("null")}
            className="absolute top-1 right-1 "
          >
            <PrettyRainbow advChildStyle="px-2 py-2">
              <PrettyTrashIcon fill={"white"} size={14} />
            </PrettyRainbow>
          </button>
        </div>
      )}
    </div>
  );
};
