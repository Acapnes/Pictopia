import React from "react";

const Categories = () => {
  return (
    <div className="w-full h-[8rem] px-10 py-3 flex flex-row space-x-4 items-center overflow-x-scroll">
      <button className="relative rounded-sm border-gray-600 w-fit flex-shrink-0 group">
        <img
          src="https://www.egoistyazar.com/upload/images/posts/ademin-yarat%C4%B1l%C4%B1%C5%9F%C4%B1.png"
          alt=""
          className="object-fill h-[5rem] rounded-sm"
        />
        <div className="absolute bottom-0 w-full h-full bg-gray-900 bg-opacity-50 group-hover:bg-gray-400 group-hover:bg-opacity-60 text-white font-semibold">
          <p className="w-full h-full flex justify-center items-center">Mythology</p>
        </div>
      </button>
      <button className="relative rounded-sm border-gray-600 w-fit flex-shrink-0 group">
        <img
          src="https://www.egoistyazar.com/upload/images/posts/ademin-yarat%C4%B1l%C4%B1%C5%9F%C4%B1.png"
          alt=""
          className="object-fill h-[5rem] rounded-sm"
        />
        <div className="absolute bottom-0 w-full h-full bg-gray-900 bg-opacity-50 group-hover:bg-gray-400 group-hover:bg-opacity-60 text-white font-semibold">
          <p className="w-full h-full flex justify-center items-center">Animals & WildLife</p>
        </div>
      </button>
    </div>
  );
};

export default Categories;
