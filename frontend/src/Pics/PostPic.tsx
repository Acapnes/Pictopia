import React from "react";

const PostPic = () => {
  return (
    <div className="fixed bottom-5 right-5">
      <a
        href="#_"
        className="relative inline-flex items-center justify-center p-4 px-3 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span className="relative text-white">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </span>
      </a>
    </div>
  );
};

export default PostPic;
