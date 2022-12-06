import React, { ReactNode } from "react";
import {
  PrettyPenIcon,
  PrettySend,
  PrettyXIcon,
} from "../../../components/Prettys/PrettyIcons";

const PrettySocialButton: React.FC<{
  children: ReactNode;
  advStyle?: string;
  socialUrl: string;
  showUrl: boolean;
}> = ({ advStyle, socialUrl, children, showUrl }) => {
  return (
    <div className="flex flex-row justify-between text-blue-400 border-b-[1.5px] pb-2 border-gray-400">
      <div className="flex flex-row space-x-3 items-center">
        <a
          href={`//${socialUrl}`}
          className={`h-fit w-fit inline-flex items-center justify-center font-bold overflow-hidden group rounded-md p-2.5 ${advStyle}`}
        >
          {children}
        </a>
        {showUrl && <a href={`//${socialUrl}`}>{socialUrl}</a>}
      </div>
      {showUrl && (
        <div className="flex flex-row space-x-2 items-center">
          <PrettyPenIcon size={20} fill={"pink"} />
          <PrettyXIcon size={20} fill={"red"} />
        </div>
      )}
    </div>
  );
};

const PrettyProfileCopyButton: React.FC<{}> = () => {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="h-full w-fit transition duration-500 group flex items-center py-3 px-4 hover:bg-soft-black"
    >
      <div className="flex items-center">
        <PrettySend />
      </div>
    </button>
  );
};

const PrettyShareProfileButton: React.FC<{}> = () => {
  return (
    <button
      onClick={() => {}}
      className="h-fit w-fit group flex items-center rounded-md"
    >
      <span className="relative rounded-md">
        <div className="flex items-center border-2 rounded-md p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="white"
            className="bi bi-upload"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
        </div>
      </span>
    </button>
  );
};

export {
  PrettySocialButton,
  PrettyProfileCopyButton,
  PrettyShareProfileButton,
};
