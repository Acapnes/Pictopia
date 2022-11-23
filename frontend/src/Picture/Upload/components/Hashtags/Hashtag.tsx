import React from "react";
import { PrettySquareFilledAddIcon } from "../../../../components/Prettys/PrettyIcons";

const Hashtag: React.FC<{
  inputHashtag: string;
  hashtagArray: string[];
  setInputHashtag: (value: React.SetStateAction<string>) => void;
  setHashtagArray: (value: React.SetStateAction<string[]>) => void;
}> = ({ inputHashtag, setInputHashtag, setHashtagArray, hashtagArray }) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <span className="font-semibold text-gray-200 text-lg">Hashtags</span>
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
            <PrettySquareFilledAddIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Hashtag;
