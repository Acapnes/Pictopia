import axios from "axios";
import React from "react";
import { PicAPI } from "../../../../Api/Pic/PicApi";
import { PicDto } from "../../../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../../../Api/User/UserApi";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyComponents";
import {
  PrettyAlertIcon,
  PrettyBookMarksIcon,
  PrettyDownloadIcon,
  PrettyShareIcon,
} from "../../../../components/Prettys/PrettyIcons";

const CardOptions: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <div className="h-full flex flex-row justify-between items-center space-x-2">
      {/* Download Picture */}
      <PrettyRainbow
        onclick={async () => {
          PicAPI.getPicsByBlob(picture).then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "picture.jpg"); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
        }}
        advStyle="rounded-md flex items-center cursor-pointer"
        advChildStyle="rounded-md px-2"
      >
        <PrettyDownloadIcon size={14} />
      </PrettyRainbow>

      {/* Save to Album */}
      <PrettyRainbow
        advStyle="rounded-md cursor-pointer"
        advChildStyle="rounded-md px-2"
        onclick={async () => {
          if (window.localStorage.getItem("access_token")) {
            await UserAPI.savedPicturesToUserAlbum(
              window.localStorage.getItem("access_token")!,
              picture
            ).then((resp) => {});
          }
        }}
      >
        <PrettyBookMarksIcon size={14} />
      </PrettyRainbow>

      {/* Share Picture */}
      <PrettyRainbow
        advStyle="cursor-pointer  rounded-md"
        advChildStyle="rounded-md px-2"
        onclick={() => {
          if (navigator.share) {
            navigator.share({
              text: `Hey look at this! \n ${picture?.title}`,
              url: "",
            });
          }
        }}
      >
        <PrettyShareIcon size={14} />
      </PrettyRainbow>

      {/* Report Picture */}
      <PrettyRainbow
        advStyle="rounded-md flex items-center cursor-pointer"
        advChildStyle="rounded-md px-2"
      >
        <PrettyAlertIcon size={14} />
      </PrettyRainbow>
    </div>
  );
};

export default CardOptions;
