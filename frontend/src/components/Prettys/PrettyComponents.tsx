import { ReactNode } from "react";

const PrettyRainbow: React.FC<{
  children: ReactNode;
  advStyle?: string;
  advChildStyle?: string;
  onclick?: () => void;
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
      className={`relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden ${advStyle}`}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
      <span
        className={`w-full relative px-3 py-2 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 ${advChildStyle}`}
      >
        {children}
      </span>
    </div>
  );
};

const PrettyRainbowLink: React.FC<{
  children: ReactNode;
  advStyle?: string;
  advChildStyle?: string;
  href?: string;
}> = ({ children, advStyle, advChildStyle, href }) => {
  return (
    <a
      href={href}
      className={`relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group cursor-pointer ${advStyle}`}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span
        className={`relative px-3 py-2 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 ${advChildStyle}`}
      >
        {children}
      </span>
    </a>
  );
};

const PrettyTip: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative pl-2 inline-flex items-center justify-center font-semibold overflow-hidden">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
      <span className="w-full relative px-4 py-4 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 text-gray-200 text-start">
        {text}
      </span>
    </div>
  );
};

export { PrettyRainbow, PrettyRainbowDiv, PrettyRainbowLink, PrettyTip };
