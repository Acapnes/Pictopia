import React from "react";
import { useState } from "react";
import { PicAPI } from "../Api/PicApi";
import { UploadPicDto } from "../Api/PicDtos/uploadPicDto";
import {
  PrettyTrashButton,
  PrettyUploadPicture,
} from "../components/PrettyButtons";
import { PrettySquareAddIcon } from "../components/PrettyIcons";
import Header from "../Menus/Header";

const UploadPic = () => {
  const [hashtagArray, setHashtagArray] = useState<string[]>([]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [picture, setPicture] = useState<any>(Object);
  const [inputHashtag, setInputHashtag] = useState("");

  const [imageURL, setImageURL] = useState<any>("null");

  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    setPicture(fileUploaded);

    setImageURL(URL.createObjectURL(fileUploaded));
  };

  const uploadPicture = async () => {
    await PicAPI.uploadPicture(
      {
        picture: picture,
        title: inputTitle,
        description: inputDescription,
      } as UploadPicDto,
      window.localStorage.getItem("access_token")!
    );
  };

  return (
    <div className="min-h-screen w-full h-full bg-soft-black">
      <Header />
      <div className="fle flex-col md:pb-5">
        <div className="w-full flex max-h-[100vh] justify-center items-center pt-3 mt-3 pb-6 px-2">
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.2rem] relative">
            {imageURL === "null" ? (
              <button
                onClick={handleClick}
                className="bg-white rounded-sm object-contain flex items-center justify-center text-3xl font-semibold p-10 "
              >
                <span>Choose a file</span>
              </button>
            ) : (
              <div className="relative">
                <img
                  src={imageURL}
                  alt=""
                  className="object-contain rounded-sm max-h-[100vh]"
                />
                <button
                  onClick={() => setImageURL("null")}
                  className="absolute top-1 right-1 md:-top-[0.15rem] md:-right-10"
                >
                  <PrettyTrashButton />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:px-5">
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.2rem] md:shadow-2xl">
            <div className="w-full flex flex-col space-y-4 px-5 pb-6 pt-4 bg-soft-black bg-opacity-95 rounded-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-200 text-lg">
                    Title
                  </span>
                  <div className="w-full items-center space-x-3 rounded-sm">
                    <input
                      onChange={(e) => setInputTitle(e.target.value)}
                      className="w-full outline-none rounded-sm p-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-200 text-lg">
                    Hashtags
                  </span>
                  <div className="w-full flex flex-row bg-white items-center p-1 space-x-3 rounded-sm">
                    <input
                      onChange={(e) => setInputHashtag(e.target.value)}
                      className="w-full bg-transparent outline-none rounded-sm"
                    />
                    <button
                      onClick={() => {
                        if (inputHashtag)
                          setHashtagArray([...hashtagArray, inputHashtag]);
                      }}
                    >
                      <PrettySquareAddIcon />
                    </button>
                  </div>

                </div>
              </div>
              {hashtagArray.length > 0 && (
                    <div className="flex flex-row gap-1 pt-3 space-x-4 overflow-auto scrollbar-hide">
                      {hashtagArray.map((hashtag, hashtagIndex) => (
                        <button
                          key={hashtagIndex}
                          className="relative group rounded-sm bg-slate-800 hover:bg-[#4795ff] bg-opacity-100 hover:bg-opacity-90 text-[#4795ff] hover:text-gray-100 font-semibold text-center"
                        >
                          <div className="px-2.5 py-1">
                            <span>
                              {hashtag[0] !== "#" && "#"}
                              {hashtag}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-gray-200 text-lg">
                  Description
                </span>
                <textarea
                  onChange={(e) => setInputDescription(e.target.value)}
                  className="min-h-[20vh] max-h-[50vh] outline-none rounded-sm p-1"
                ></textarea>
              </div>

              <div className="w-full flex justify-end items-center">
                <button onClick={() => uploadPicture()}>
                  <PrettyUploadPicture />
                </button>
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPic;
