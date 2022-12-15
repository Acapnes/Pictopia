import React, { useState } from "react";
import { PicAPI } from "../../../../Api/Pic/PicApi";
import { PicDto } from "../../../../Api/Pic/dtos/picDto";
import { AccountAPI } from "../../../../Api/User/AccountApi";
import {
  PrettyRainbow,
  PrettyRainbowLink,
} from "../../../../components/Prettys/PrettyComponents";
import {
  PrettyAlertIcon,
  PrettyBookMarksIcon,
  PrettyDownloadIcon,
  PrettyLinkIcon,
  PrettyShareIcon,
} from "../../../../components/Prettys/PrettyIcons";
import { useToastStore } from "../../../../components/Zustand/store";
import { ReturnFuncDto } from "../../../../Api/Utils/ReturnFuncDto";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";

const CardOptions: React.FC<{ picture: PicDto }> = ({ picture }) => {
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
      <PrettyRainbow
        advStyle="rounded-md flex items-center cursor-pointer"
        advChildStyle="rounded-md px-2"
      >
        <PrettyAlertIcon size={14} />
        {/* <ReportPopUp /> */}
      </PrettyRainbow>
    </div>
  );
};

const CardAuthorOptions: React.FC<{
  visitor: UserDto;
  authorPic: PicDto["authorPic"];
}> = ({ authorPic, visitor }) => {
  return (
    <>
      {visitor?._id === authorPic?._id && (
        <div className="w-full h-full flex flex-row justify-end items-center">
          {/* Edit Picture */}
          <PrettyRainbowLink
            href={`/edit`}
            advStyle="rounded-sm cursor-pointer"
            advChildStyle="rounded-sm px-3 py-1 flex flex-row space-x-1 items-center"
          >
            <PrettyLinkIcon size={14} fill="white" />
            <span className="text-sm font-semibold text-gray-200">Edit</span>
          </PrettyRainbowLink>
        </div>
      )}
    </>
  );
};

const ReportPopUp: React.FC<{}> = ({}) => {
  return (
    <>
      <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-40 bg-rough-soft-black rounded-sm cursor-default">
        <div className="flex flex-col px-5 py-4 space-y-5">
          <div className="flex flex-row space-x-1 items-center justify-center relative">
            <div className="absolute left-0">
              <PrettyAlertIcon size={20} />
            </div>
            <p className="text-gray-300 text-2xl">Report Picture</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p>Sign The Reason</p>
            <textarea className="w-[15rem] sm:w-[20rem] md:w-[25rem] min-h-[10rem] max-h-[20rem] bg-light-soft-black text-gray-300 outline-none px-1 py-1" />
          </div>
          <div className="w-full flex justify-between">
            <button className="border-2 rounded-sm w-fit px-2 py-1.5 border-light-soft-black transition duration-300 hover:border-2xl-extra-light-soft-black">
              <p className="text-sm">Cancel</p>
            </button>
            <button className="border-2 rounded-sm w-fit px-2 py-1.5 border-light-soft-black transition duration-300 hover:border-2xl-extra-light-soft-black">
              <p className="text-sm">Send Report</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardOptions, CardAuthorOptions };
