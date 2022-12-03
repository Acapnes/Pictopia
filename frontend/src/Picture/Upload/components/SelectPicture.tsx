import React from "react";
import {
  PrettyRainbow,
  PrettyTrashButton,
} from "../../../components/Prettys/PrettyButtons";
import { PrettyPictureIcon } from "../../../components/Prettys/PrettyIcons";

const SelectPicture: React.FC<{
  imageURL: any;
  handleClick: Function;
  setImageURL: any;
}> = ({ imageURL, handleClick, setImageURL }) => {
  
  return (
    <div className="w-full flex items-center justify-center">
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
            Supports with PNG, JPG, JPEG, WEBP
          </p>
        </div>
      ) : (
        <div className="relative">
          <img
            id="UploadPicture"
            src={imageURL}
            alt=""
            className="object-contain rounded-sm max-h-[100vh] "
          />
          <button
            onClick={() => setImageURL("null")}
            className="absolute top-1 right-1 "
          >
            <PrettyTrashButton />
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectPicture;
