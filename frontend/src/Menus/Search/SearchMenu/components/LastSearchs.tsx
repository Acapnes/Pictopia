import React from "react";

const LastSearchs: React.FC<{}> = () => {
  return (
    <div className="w-full flex flex-row space-x-2 border-b-2 pb-3 border-pretty-pink">
      <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
        <div className="px-2.5 py-1">
          <span>Vikings</span>
        </div>
      </button>
      <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
        <div className="px-2.5 py-1">
          <span>Movies</span>
        </div>
      </button>
      <button className="relative group rounded-sm bg-slate-800 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-center duration-300">
        <div className="px-2.5 py-1">
          <span>Daily</span>
        </div>
      </button>
    </div>
  );
};

export default LastSearchs;
