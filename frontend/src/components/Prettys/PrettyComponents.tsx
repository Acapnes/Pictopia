import { ReactNode, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";

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
        className={`relative transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 ${advChildStyle}`}
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
  href: string;
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

const PrettyTip: React.FC<{ text: string; advStyle?: string }> = ({
  text,
  advStyle,
}) => {
  return (
    <div className="w-full relative pl-2 inline-flex items-center justify-center font-semibold overflow-hidden">
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
      <span
        className={`w-full relative px-4 py-4 transition-all ease-out bg-gray-900 group-hover:bg-opacity-0 duration-400 text-gray-200 text-start break-all ${advStyle}`}
      >
        {text}
      </span>
    </div>
  );
};

const ScalePicture: React.FC<{
  picture: PicDto["picture_file"];
  modalState: boolean;
  setModalState: (value: React.SetStateAction<boolean>) => void;
}> = ({ picture, modalState, setModalState }) => {
  return (
    <>
      {modalState && (
        <div
          onClick={() => {
            setModalState(false);
          }}
          className="z-20 fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center cursor-zoom-out"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-rough-soft-black bg-opacity-95"></div>
          </div>
          <div className="z-30 rounded-lg overflow-hidden shadow-xl transform transition-all w-screen h-screen flex items-center justify-center px-20 py-20">
            <img
              src={`data:${picture?.contentType};base64,${picture?.data}`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
// İçerisinde sadece büyük bir resim olacak resime tıklanınca bir şey olmayacak ama çevresine tıklanınca modal'ın kapanması gerekiyor
export {
  PrettyRainbow,
  PrettyRainbowDiv,
  PrettyRainbowLink,
  PrettyTip,
  ScalePicture,
};
