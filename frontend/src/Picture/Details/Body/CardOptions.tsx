import React from "react";
import { PicDto } from "../../../Api/Pic/picDtos";
import {
  PrettyBookMarksIcon,
  PrettyDownloadIcon,
  PrettyHorizontalOptionsIcon,
  PrettyLinkIcon,
  PrettyShareIcon,
} from "../../../components/Prettys/PrettyIcons";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { AccountAPI } from "../../../Api/User/AccountApi";
import { ReturnFuncDto } from "../../../Api/Utils/UtilsDtos";
import { PicAPI } from "../../../Api/Pic/PicApi";
import { useAlertStore } from "../../../components/Zustand";

const CardOptions: React.FC<{
  picture: PicDto;
  visitor: UserDto;
  setModalState: (value: React.SetStateAction<boolean>) => void;
}> = ({ picture, visitor, setModalState }) => {
  const setToastState = useAlertStore((state: any) => state.setToastState);

  return (
    <div className="flex flex-row justify-between items-center font-bold font-mono">
      <div className="flex flex-row space-x-5">
        {/* Save Picture */}
        <button
          onClick={async () => {
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
          className="flex flex-row space-x-1 items-center hover:text-pretty-rough-yellow duration-300"
        >
          <PrettyBookMarksIcon size={20} />
          <p className="whitespace-nowrap">Save Picture</p>
        </button>
      </div>

      <div className="flex flex-row space-x-4">
        {/* Full-Screen Href */}
        <a
          href={`/pictures/${picture?._id}`}
          className="group flex flex-row space-x-1 items-center pr-1"
        >
          <div className="duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
            <PrettyLinkIcon size={20} />
          </div>
        </a>

        {/* Full-Screen PopUp */}
        <button
          onClick={() => setModalState(true)}
          className="flex flex-row space-x-1 items-center hover:text-pretty-pink duration-300 pr-1 hover:scale-[135%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrows-fullscreen"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
            />
          </svg>
        </button>

        {/* Share Picture */}
        <button
          onClick={async () => {
            if (navigator.share) {
              navigator.share({
                text: `Hey look at this! \n ${picture?.title}`,
                url: "",
              });
            }
          }}
          className="flex flex-row space-x-1 items-center hover:text-pretty-pink duration-300 pr-1"
        >
          <PrettyShareIcon size={20} />
        </button>

        {/* Download Picture */}
        <button
          onClick={async () => {
            PicAPI.getPicsByBlob(picture).then((resp) => {
              const url = window.URL.createObjectURL(new Blob([resp]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "picture.jpg"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          }}
          className="flex flex-row space-x-1 items-center hover:text-pretty-pink duration-300"
        >
          <PrettyDownloadIcon size={24} />
        </button>

        {/* More */}
        <button className="flex flex-row space-x-1 items-center hover:text-pretty-pink duration-300">
          <PrettyHorizontalOptionsIcon size={24} />
        </button>

        <CardAuthorOptions
          pictureId={picture?._id}
          authorPic={picture?.authorPic}
          visitor={visitor}
        />
      </div>
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
        <a
          href={`/edit/${pictureId}`}
          className="h-full flex flex-row space-x-1 items-center text-pretty-pink hover:text-pretty-rough-pink duration-300"
        >
          <span className="whitespace-nowrap">Edit Picture</span>
          <PrettyLinkIcon size={20} />
        </a>
      )}
    </>
  );
};

export { CardOptions, CardAuthorOptions };
