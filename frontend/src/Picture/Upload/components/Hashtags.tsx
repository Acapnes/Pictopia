import React from "react";
import {
  PrettySquareFilledAddIcon,
  PrettyXIcon,
} from "../../../components/Prettys/PrettyIcons";

const Hashtag: React.FC<{
  hashtagArray: string[];
  refInput: any;
  setHashtagArray: (value: React.SetStateAction<string[]>) => void;
}> = ({ setHashtagArray, hashtagArray, refInput }) => {
  const setHashTags = () => {
    setHashtagArray([...hashtagArray, refInput.current.value]);
    refInput.current.value = "";
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <span className="font-semibold text-gray-200 text-lg">Hashtags</span>
        <div className="w-full flex flex-row bg-white items-center p-1 space-x-3 rounded-sm">
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
      </div>
    </>
  );
};

const HashtagList: React.FC<{
  hashtags: string[];
  setHashtagArray: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ hashtags, setHashtagArray }) => {
  return (
    <>
      {hashtags.length > 0 && (
        <div className="flex flex-row space-x-3 overflow-auto scrollbar-hide">
          {hashtags.map((hashtag: any, hashtagIndex: any) => (
            <button
              // onClick={() => setHashtagArray()}
              key={hashtagIndex}
              className="relative group rounded-sm bg-slate-800 hover:bg-[#4795ff] bg-opacity-100 hover:bg-opacity-90 text-[#4795ff] hover:text-gray-100 font-semibold text-center"
            >
              <div className="flex flex-row items-center space-x-1 px-2.5 py-1">
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

export { Hashtag, HashtagList };
