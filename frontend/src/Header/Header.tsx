import React from "react";

const Header = () => {
  return (
    <div className="w-full h-[4rem] bg-soft-black text-white flex flex-row justify-between space-x-10 items-center px-8 sticky top-0 z-10">
      <div className="w-[7rem] h-[7rem] items-center flex justify-center">
        <img src="/piclogo.png" className="w-fit h-fit" alt="" />
      </div>
      <div className="w-full hidden md:block lg:block">
        <div className=" border-2 border-gray-500 px-2 py-1 flex flex-row items-center space-x-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full outline-none bg-transparent text-sm"
            placeholder="search"
          />
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <a
          href="/login"
          className="w-[6rem] text-sm relative inline-flex items-center justify-start px-2 py-2 overflow-hidden font-bold rounded-full group"
        >
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <span className="relative w-full text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 text-center">
            SIGN IN
          </span>
          <span className="absolute inset-0 border-2 border-white rounded-full"></span>
        </a>

        <button className="transition duration-0 hover:duration-700 ease-out bg-gray-700 bg-opacity-0 hover:bg-opacity-80 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
