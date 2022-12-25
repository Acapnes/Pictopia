import React from "react";
import { PicAPI } from "../../../Api/Pic/PicApi";
import { PicDto } from "../../../Api/Pic/dtos/picDto";
import { AccountAPI } from "../../../Api/User/AccountApi";
import {
  PrettyRainbow,
  PrettyRainbowLink,
} from "../../../components/Prettys/PrettyComponents";
import {
  PrettyAlertIcon,
  PrettyBookMarksIcon,
  PrettyDownloadIcon,
  PrettyLinkIcon,
  PrettyShareIcon,
} from "../../../components/Prettys/PrettyIcons";
import { useToastStore } from "../../../components/Zustand/store";
import { ReturnFuncDto } from "../../../Api/Utils/ReturnFuncDto";
import { UserDto } from "../../../Api/User/UserDtos/userDto";

const CardOptions: React.FC<{ picture: PicDto; visitor: UserDto }> = ({
  picture,
  visitor,
}) => {
  const setToastState = useToastStore((state: any) => state.setToastState);

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
            await AccountAPI.savedPicturesToUserAlbum(
              window.localStorage.getItem("access_token")!,
              picture
            ).then(
              async (loginResp: ReturnFuncDto) =>
                await setToastState(loginResp.message)
            );
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
      <PrettyRainbowLink
        href="/report"
        advStyle="rounded-md flex items-center cursor-pointer"
        advChildStyle="rounded-md px-2"
      >
        <PrettyAlertIcon size={14} />
      </PrettyRainbowLink>

      <CardAuthorOptions
        pictureId={picture?._id}
        authorPic={picture?.authorPic}
        visitor={visitor}
      />
    </div>
  );
};

const CardAuthorOptions: React.FC<{
  pictureId: PicDto["_id"];
  visitor: UserDto;
  authorPic: PicDto["authorPic"];
}> = ({ authorPic, visitor, pictureId }) => {
  return (
    <>
      {visitor?._id === authorPic?._id && (
        <div className="h-full flex flex-row justify-end items-center">
          {/* Edit Picture */}
          <PrettyRainbowLink
            href={`/edit/picture/${pictureId}`}
            advStyle="rounded-md cursor-pointer"
            advChildStyle="rounded-md px-3 py-1 flex flex-row space-x-1 items-center"
          >
            <PrettyLinkIcon size={14} fill="white" />
            <span className="text-sm font-semibold text-gray-200">Edit</span>
          </PrettyRainbowLink>
        </div>
      )}
    </>
  );
};

export { CardOptions, CardAuthorOptions };
