import { ReactNode } from "react";
import { PicDto } from "../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../Api/User/UserApi";
import { ReturnFuncDto } from "../../Api/UtilsDtos/ReturnFuncDto";
import { MultiFuncs } from "../Functions/MultipleFuncs";
import { PrettyRotatingArrow } from "./PrettyComponents";
import {
  PrettyAlertIcon,
  PrettyBookMarksIcon,
  PrettyCameraIcon,
  PrettyHomeIcon,
  PrettySearchIcon,
  PrettySettingSlidersIcon,
  PrettyShareIcon,
  PrettySignIcon,
  PrettyThumbsDownIcon,
  PrettyThumbsUpIcon,
  PrettyTrashIcon,
  PrettyUploadIcon,
} from "./PrettyIcons";

const PrettyRainbow: React.FC<{ children: ReactNode; rounded?: any }> = ({
  children,
  rounded,
}) => {
  return (
    <div
      className={`relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group ${
        rounded ? "rounded-md" : "rounded-sm"
      }`}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span
        className={`relative px-3 py-2 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 ${
          rounded ? "rounded-md" : "rounded-sm"
        }`}
      >
        {children}
      </span>
    </div>
  );
};

const PrettyShare: React.FC<{ picture: PicDto }> = ({ picture }) => {
  const sharePicture = async () => {
    if (navigator.share) {
      navigator.share({
        text: `Hey look at this! \n ${picture?.title}`,
        url: "",
      });
    }
  };
  return (
    <button
      onClick={() => sharePicture()}
      className="rounded-md flex items-center"
    >
      <PrettyRainbow rounded>
        <PrettyShareIcon />
      </PrettyRainbow>
    </button>
  );
};

const PrettySavePicture: React.FC<{
  picture: PicDto;
  setCustomToastResult: React.Dispatch<
    React.SetStateAction<ReturnFuncDto | undefined>
  >;
}> = ({ picture, setCustomToastResult }) => {
  const savePictureToAlbum = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.savedPicturesToUserAlbum(
        window.localStorage.getItem("access_token")!,
        picture
      ).then((resp) => {
        setCustomToastResult(resp);
        MultiFuncs.AlertTimer("DetailsCustomToast", true);
      });
    }
  };

  return (
    <button
      onClick={() => savePictureToAlbum()}
      className="rounded-md flex items-center"
    >
      <PrettyRainbow rounded>
        <PrettyBookMarksIcon />
      </PrettyRainbow>
    </button>
  );
};

const PrettyCommentsButton: React.FC<{ state: boolean; length: number }> = ({
  state,
  length,
}) => {
  return (
    <PrettyRainbow>
      <div className="flex flex-row space-x-1 items-center">
        <span className="text-gray-200">{length ? length : "0"} Comments</span>
        <PrettyRotatingArrow state={state} />
      </div>
    </PrettyRainbow>
  );
};

const PrettyReportButton = () => {
  return (
    <button className="rounded-md flex items-center">
      <PrettyRainbow rounded>
        <PrettyAlertIcon size={16} />
      </PrettyRainbow>
    </button>
  );
};

const PrettyAuthButton = (props: any) => {
  return (
    <PrettyRainbow>
      <div className="px-4 py-0.5">
        <span className="text-white ">{props.text}</span>
      </div>
    </PrettyRainbow>
  );
};

const PrettySaveChanges = () => {
  return (
    <PrettyRainbow>
      <div className="px-2 py-0.5">
        <span className="text-white">Save</span>
      </div>
    </PrettyRainbow>
  );
};

const PrettyChangeProfileAvatar = () => {
  return (
    <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <span className="text-white">
          <PrettyCameraIcon fill={"white"} />
        </span>
      </span>
    </div>
  );
};

const PrettyHeaderSignIn = () => {
  return (
    <div className=" whitespace-nowrap h-full inline-flex items-center overflow-hidden font-bold group w-fit text-white">
      <a
        href="/login"
        className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm"
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
        <span className="relative pl-1 pr-2 py-1.5 md:px-4 md:py-2 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 group-hover:text-black duration-400">
          <span className="hidden md:block">SIGN IN</span>
          <div className="block md:hidden">
            <PrettySignIcon size={20} />
          </div>
        </span>
      </a>
    </div>
  );
};

const PrettyTrashButton: React.FC<{}> = () => {
  return (
    <PrettyRainbow>
      <PrettyTrashIcon fill={"white"} size={18} />
    </PrettyRainbow>
  );
};

const PrettyProfileSelectionButton = (props: any) => {
  return (
    <div
      className={`relative min-w-[10rem] w-full h-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm`}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span
        className={`w-full relative px-4 py-2 transition-all ease-out rounded-sm group-hover:bg-opacity-0 duration-400 ${
          props.text === props.selectedTab ? "bg-transparent" : "bg-gray-900"
        }`}
      >
        <span className="text-white">{props.text}</span>
      </span>
    </div>
  );
};

const PrettyExtendedProfileButton = (props: any) => {
  return (
    <div
      className={`w-[6rem] text-sm relative inline-flex ${
        props.selectedTab === 1 ? "bg-white" : "bg-soft-black text-white"
      } duration-150 hover:scale-110 items-center justify-start px-2 py-2 overflow-hidden font-bold rounded-sm group`}
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0  opacity-[3%]"></span>
      <span
        className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24
        opacity-100 group-hover:-translate-x-8"
      ></span>
      <span className="relative w-full transition-colors duration-200 ease-in-out text-center">
        {props.text}
      </span>
      <span className="absolute inset-0 border-2 border-soft-black rounded-sm"></span>
    </div>
  );
};

const PrettyCategories = (props: any) => {
  return (
    <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
        <div className="flex flex-row">
          <span className="text-white hidden md:block pr-1">Categories</span>
          <PrettyRotatingArrow state={props.showCategories} />
        </div>
      </span>
    </div>
  );
};

const PrettyUploadPicture = () => {
  return (
    <div className="h-full flex items-center">
      <PrettyRainbow>
        <div className="flex flex-row">
          <span className="text-white hidden lg:block pr-1.5">Upload</span>
          <div className="flex items-end">
            <PrettyUploadIcon />
          </div>
        </div>
      </PrettyRainbow>
    </div>
  );
};

const PrettyHeaderUploadPicture = () => {
  return (
    <a href="/upload" className="h-full flex items-center">
      <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="relative px-4 py-2 md:py-3 lg:py-2 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
          <div className="flex flex-row">
            <span className="text-white hidden lg:block pr-1.5">Upload</span>
            <div className="flex items-end">
              <PrettyUploadIcon />
            </div>
          </div>
        </span>
      </div>
    </a>
  );
};

const PrettyHomeButton = () => {
  return (
    <div className="h-full flex items-center">
      <a
        href="/upload"
        className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm"
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
          <PrettyHomeIcon fill={"white"} size={22} />
        </span>
      </a>
    </div>
  );
};

const PrettySearchMobileHeaderButton = () => {
  return (
    <div className="h-full flex items-center">
      <a
        href="/upload"
        className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm"
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
          <PrettySearchIcon size={26} fill={"white"} />
        </span>
      </a>
    </div>
  );
};

const PrettySearch = () => {
  return (
    <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-semibold overflow-hidden rounded-sm">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
      <span className=" w-full relative px-4 md:py-2 sm:py-1 transition-all ease-out bg-gray-900 rounded-sm duration-400">
        <div className="flex flex-row space-x-2">
          <div className="h-full flex items-center mt-[0.25rem]">
            <PrettySearchIcon />
          </div>
          <input
            type="text"
            placeholder="search"
            name=""
            id=""
            className="outline-none bg-transparent text-gray-100 w-full placeholder:font-semibold"
          />
        </div>
      </span>
    </div>
  );
};

const PrettySearchMenuButton = (props: any) => {
  return (
    <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-3.5 py-1.5 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
        <span className="text-gray-200">{props.text}</span>
      </span>
    </div>
  );
};

const PrettySearchCategories = () => {
  return (
    <div className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden rounded-md">
      <span className="w-full h-full bg-transparent border-2 border-gray-200 absolute rounded-md"></span>
      <span className=" w-full relative px-4 py-2 transition-all ease-out rounded-md duration-400">
        <div className="flex flex-row space-x-2 py-[0.1rem]">
          <div className="h-full flex items-center mt-[0.25rem] ">
            <PrettySearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search in categories"
            name=""
            id=""
            className="outline-none bg-transparent font-light text-white w-full"
          />
        </div>
      </span>
    </div>
  );
};

const PrettyThumbsUpButton = () => {
  return (
    <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative flex flex-row items-center space-x-1 px-3 py-[0.45rem] transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <PrettyThumbsUpIcon />
        <p className="font-semibold text-sm text-gray-200">1754</p>
      </span>
    </div>
  );
};

const PrettyThumbsDownButton = () => {
  return (
    <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative flex flex-row items-center space-x-1 px-3 py-[0.45rem] transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <PrettyThumbsDownIcon />
        <p className="font-semibold text-sm text-gray-200">13</p>
      </span>
    </div>
  );
};

const PrettyReply = () => {
  return (
    <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      <span className="relative px-1 py-1 first-letter:transition-all ease-out bg-pretty-pink rounded-md group-hover:bg-opacity-0 duration-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          className="bi bi-reply-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
        </svg>
      </span>
    </div>
  );
};

const PrettySend: React.FC<{
  size?: number;
  fill?: string;
}> = ({ size, fill }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 16}
        height={size || 16}
        fill={fill || "currentColor"}
        className="bi bi-send-plus-fill"
        viewBox="0 0 16 16"
      >
        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
      </svg>
    </div>
  );
};

const PrettyPictureOptions = () => {
  return (
    <div className="relative h-fit w-fit p-[0.12rem] inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative p-0.5 px-2 py-2.5 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
        <PrettySettingSlidersIcon fill={"white"} />
      </span>
    </div>
  );
};

const PrettyAddAvatar = () => {
  return (
    <div className="relative h-fit w-fit p-[0.12rem] inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative p-10 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
        <div className="flex flex-col space-y-1 items-center">
          <span className="text-2xl font-semibold text-gray-200">
            Add an Avatar
          </span>
          <PrettyCameraIcon size={30} fill={"white"} />
        </div>
      </span>
    </div>
  );
};

export {
  PrettyRainbow,
  PrettyShare,
  PrettySavePicture,
  PrettyCommentsButton,
  PrettyReportButton,
  PrettyAuthButton,
  PrettySaveChanges,
  PrettyChangeProfileAvatar,
  PrettyHeaderSignIn,
  PrettyCategories,
  PrettySearch,
  PrettyUploadPicture,
  PrettySearchCategories,
  PrettyThumbsUpButton,
  PrettyThumbsDownButton,
  PrettyReply,
  PrettySend,
  PrettyProfileSelectionButton,
  PrettyExtendedProfileButton,
  PrettyTrashButton,
  PrettyPictureOptions,
  PrettyAddAvatar,
  PrettyHomeButton,
  PrettySearchMenuButton,
  PrettySearchMobileHeaderButton,
  PrettyHeaderUploadPicture,
};
