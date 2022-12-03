import { ReactNode } from "react";
import { PrettyRotatingArrow } from "./PrettyComponents";
import { PrettyTrashIcon, PrettyUploadIcon } from "./PrettyIcons";

const PrettyRainbow: React.FC<{
  children: ReactNode;
  advStyle?: string;
  advChildStyle?: string;
  onclick?: () => any;
}> = ({ children, advStyle, advChildStyle, onclick }) => {
  return (
    <div
      onClick={onclick}
      className={`relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group cursor-pointer ${advStyle}`}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span
        className={`relative px-3 py-2 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 ${advChildStyle}`}
      >
        {children}
      </span>
    </div>
  );
};

const PrettyRainbowDiv: React.FC<{
  children: ReactNode;
  advStyle?: string;
  advChildStyle?: string;
}> = ({ children, advStyle, advChildStyle }) => {
  return (
    <div
      className={`relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden ${advStyle}`}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
      <span
        className={`relative px-3 py-2 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 ${advChildStyle}`}
      >
        {children}
      </span>
    </div>
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

const PrettySaveChanges = () => {
  return (
    <PrettyRainbow>
      <div className="px-2 py-0.5">
        <span className="text-white">Save</span>
      </div>
    </PrettyRainbow>
  );
};

const PrettyTrashButton: React.FC<{}> = () => {
  return (
    <PrettyRainbow>
      <PrettyTrashIcon fill={"white"} size={18} />
    </PrettyRainbow>
  );
};

const PrettyProfileSelectionButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <PrettyRainbow
      advStyle={`w-full min-w-[10rem] rounded-sm`}
      advChildStyle="w-full min-w-[10rem]"
    >
      <span className="text-white">{text}</span>
    </PrettyRainbow>
  );
};

const PrettyHeaderUploadPicture = () => {
  return (
    <a href="/upload" className="h-full flex items-center">
      <PrettyRainbow>
        <div className="flex flex-row">
          <span className="text-white hidden lg:block pr-1.5">Upload</span>
          <div className="flex items-end">
            <PrettyUploadIcon />
          </div>
        </div>
      </PrettyRainbow>
    </a>
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

export {
  PrettyRainbow,
  PrettyRainbowDiv,
  PrettyCommentsButton,
  PrettySaveChanges,
  PrettySend,
  PrettyProfileSelectionButton,
  PrettyTrashButton,
  PrettyHeaderUploadPicture,
};
