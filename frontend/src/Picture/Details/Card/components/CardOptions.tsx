import React from "react";
import { PicDto } from "../../../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../../../Api/User/UserApi";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyButtons";
import {
  PrettyAlertIcon,
  PrettyBookMarksIcon,
  PrettyShareIcon,
} from "../../../../components/Prettys/PrettyIcons";

const CardOptions: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <div className="h-full flex flex-col justify-between items-end space-y-3">
      {/* Save to Album */}
      <PrettyRainbow
        advStyle="rounded-md flex items-center cursor-pointerrounded-md"
        advChildStyle="rounded-md"
        onclick={async () => {
          if (window.localStorage.getItem("access_token")) {
            await UserAPI.savedPicturesToUserAlbum(
              window.localStorage.getItem("access_token")!,
              picture
            ).then((resp) => {});
          }
        }}
      >
        <PrettyBookMarksIcon />
      </PrettyRainbow>

      {/* Share Picture */}
      <PrettyRainbow
        advStyle="cursor-pointer rounded-md"
        advChildStyle="rounded-md"
        onclick={() => {
          if (navigator.share) {
            navigator.share({
              text: `Hey look at this! \n ${picture?.title}`,
              url: "",
            });
          }
        }}
      >
        <PrettyShareIcon />
      </PrettyRainbow>

      {/* Report Picture */}
      <PrettyRainbow
        advStyle="rounded-md flex items-center cursor-pointer"
        advChildStyle="rounded-md"
      >
        <PrettyAlertIcon size={16} />
      </PrettyRainbow>
    </div>
  );
};

export default CardOptions;
