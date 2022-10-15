import { useState } from "react";
import { UserDto } from "../../Api/UserDtos/userDto";
import {
  PrettyChangeProfileAvatar,
  PrettyHeaderSignIn,
  PrettyProfile,
  PrettySaveChanges,
} from "../../components/PrettyButtons";
import ExtendedChangeProfile from "./ExtendedChangeProfile";

const ProfileCredentials = (props: any) => {
  const [showExtendedMenu, setShowExtendedMenu] = useState(false);
  const [inputType, setInputType] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 ">
      <div className="flex justify-center items-center h-fit lg:sticky lg:top-10 relative">
        <div className="bg-[#fafafa] rounded-full shadow-lg p-[0.8rem] relative">
          <img
            src={`data:${props?.user?.avatar?.contentType};base64,${props?.user?.avatar?.data}`}
            alt=""
            className="object-contain rounded-full max-h-[30rem]"
          />
        </div>
      </div>
      <div className="w-full lg:col-span-3 shadow-lg bg-[#fafafa] space-y-4 rounded-sm px-8 py-3">
        <div className="w-full h-[3rem] flex flex-row justify-around">
          <button className="rounded-lg px-5">
            <PrettyProfile />
          </button>
          <button>Extended</button>
        </div>
        <a
          href="/login"
          className="w-full text-sm relative inline-flex bg-soft-black items-center justify-start px-2 py-2 overflow-hidden font-bold rounded-full group"
        >
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0  opacity-[3%]"></span>
          <span
            className="w-full h-48 -mt-1 transition-all duration-500 ease-in-out -translate-x-2 -translate-y-24
       bg-white opacity-100 group-hover:-translate-x-40"
          ></span>
          <span className="relative w-full text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 text-center">
            Simple
          </span>
          <span className="absolute inset-0 border-2 border-soft-black rounded-full"></span>
        </a>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10 mb-20 ">
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">Email</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder={props?.user?.email}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">Username</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder={props?.user?.username}
            />
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">Name</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder={props?.user?.name}
            />
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">BirthDate</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder={props?.user?.birthDate}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:cols-span-4 xl:col-span-4 2xl:col-span-4 space-y-2 h-full">
            <div className="text-center flex items-center">
              <p className="font-semibold">Bio</p>
            </div>
            <textarea
              className="w-full h-full break-words px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800 resize-none"
              placeholder={props?.user?.bio}
            />
          </div>
        </div>
        <div className="w-full flex justify-between mb-4">
          <button>
            <PrettyChangeProfileAvatar />
          </button>
          <button>
            <PrettySaveChanges />
          </button>
        </div>
        <button
          onClick={() => setShowExtendedMenu(!showExtendedMenu)}
          className="w-full space-y-2 mb-4"
        >
          <div className="w-full text-center font-semibold text-sm">
            Show Extended Menu
          </div>
          <hr className="border-black border-[0.1rem] bg-black" />
          <div className="flex items-center justify-center w-full">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-bar-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                />
              </svg>
            </div>
          </div>
        </button>
        <ExtendedChangeProfile showState={showExtendedMenu} />
      </div>
    </div>
  );
};

export default ProfileCredentials;
