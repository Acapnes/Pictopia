import React from "react";
import { PrettyXIcon } from "../../../../components/Prettys/PrettyIcons";

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

export default HashtagList;
