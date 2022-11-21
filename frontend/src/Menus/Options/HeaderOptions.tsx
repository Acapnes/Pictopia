import { useState } from "react";
import { PrettyOptionsIcon } from "../../components/Prettys/PrettyIcons";
import HeaderOptionsMenu from "./HeaderOptionsMenu";

const HeaderOptions: React.FC<{}> = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-fit h-full items-center flex relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="relative w-full h-fit p-0.5 inline-flex items-center justify-center font-semibold overflow-hidden rounded-sm hover:cursor-pointer group"
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="relative p-0.5 py-2 md:py-2.5 transition-all ease-out bg-gray-900 rounded-sm group-hover:bg-opacity-0 duration-400">
          <PrettyOptionsIcon fill={"white"} size={18} />
        </span>
      </button>

      {showSettings && (
        <div className="absolute w-full flex items-start shadow-lg">
          <HeaderOptionsMenu />
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
