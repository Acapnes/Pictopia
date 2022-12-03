import { useState } from "react";
import { PrettyRainbow } from "../../components/Prettys/PrettyButtons";
import { PrettyOptionsIcon } from "../../components/Prettys/PrettyIcons";
import HeaderOptionsMenu from "./HeaderOptionsMenu";

const HeaderOptions: React.FC<{}> = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-fit h-full items-center flex relative">
      <PrettyRainbow
        advChildStyle="px-0.5"
        onclick={() => setShowSettings(!showSettings)}
      >
        <PrettyOptionsIcon fill={"white"} size={18} />
      </PrettyRainbow>

      {showSettings && (
        <div className="absolute w-full flex items-start shadow-lg">
          <HeaderOptionsMenu />
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
