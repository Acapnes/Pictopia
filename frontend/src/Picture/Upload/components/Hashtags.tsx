import React, { ReactHTMLElement } from "react";
import { PicDto } from "../../../Api/Pic/dtos/picDto";
import {
  PrettySquareFilledAddIcon,
  PrettyXIcon,
} from "../../../components/Prettys/PrettyIcons";

const HashtagAppend: React.FC<{
  refInput: any;
  advStyle?: string;
  picture: PicDto;
  setPicture: (value: React.SetStateAction<PicDto>) => void;
}> = ({ setPicture, refInput, advStyle, picture }) => {
  const setHashTags = () => {
    setPicture({
      ...picture,
      hashTags:
        picture?.hashTags?.length > 0
          ? [...picture?.hashTags, refInput.current!.value]
          : [refInput.current!.value],
    });
    refInput.current.value = "";
  };

  return (
    <>
      <div
        className={`w-full flex flex-row bg-white items-center p-1 space-x-3 rounded-sm ${advStyle}`}
      >
        <input
          ref={refInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && refInput.current.value) setHashTags();
          }}
          className="w-full bg-transparent outline-none rounded-sm"
        />
        <button
          onClick={() => {
            if (refInput.current.value) setHashTags();
          }}
        >
          <PrettySquareFilledAddIcon />
        </button>
      </div>
      <HashtagList
        hashtags={picture?.hashTags}
        picture={picture}
        setPicture={setPicture}
      />
    </>
  );
};

const HashtagList: React.FC<{
  hashtags: PicDto["hashTags"];
  picture: PicDto;
  setPicture: (value: React.SetStateAction<PicDto>) => void;
}> = ({ hashtags, setPicture, picture }) => {
  return (
    <>
      {hashtags?.length > 0 && (
        <div className="flex flex-row space-x-3 overflow-auto scrollbar-hide pt-1 items-center">
          {hashtags?.map((hashtag: any, hashtagIndex: any) => (
            <button
              onClick={() => {
                const updatedHashtags = picture.hashTags.filter(
                  (_, i) => i !== hashtagIndex
                );
                setPicture({ ...picture, hashTags: updatedHashtags });
              }}
              key={hashtagIndex}
              className="rounded-md border-[1px] border-pretty-rough-pink border-opacity-70 px-2 py-1 text-pretty-pink text-sm"
            >
              <div className="flex flex-row items-center space-x-1">
                <span>
                  {hashtag[0] !== "#" && "#"}
                  {hashtag}
                </span>
                <PrettyXIcon size={12} fill={"white"} />
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export { HashtagAppend, HashtagList };
