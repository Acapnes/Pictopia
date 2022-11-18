import React, { useState } from "react";
import { UserAPI } from "../../../../Api/User/UserApi";
import { MultiFuncs } from "../../../../components/Functions/MultipleFuncs";
import { PrettyPictureOptions } from "../../../../components/Prettys/PrettyButtons";
import {
  PrettyCameraIcon,
  PrettyCheckIcon,
  PrettyProfileIcon,
  PrettyTrashIcon,
  PrettyXIcon,
} from "../../../../components/Prettys/PrettyIcons";
import CustomAlert from "../../../../components/Views/CustomAlert";

const ProfileAvatar = (props: any) => {
  const [imageURL, setImageURL] = useState<any>("null");
  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [changeAvatar, setChangeAvatar] = useState<any>();
  const [updateResult, setUpdateResult] = useState(Object);

  const [showAvatarSettings, setShowAvatarSettings] = useState(false);

  const [changeAvatarOptions, setChangeAvatarOptions] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const changeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.changeUserAvatar(
        changeAvatar,
        window.localStorage.getItem("access_token")!
      )
        .then((resp) => setUpdateResult(resp))
        .then(() => MultiFuncs.AlertTimer("CustomAvatarAlert", true));
    }
  };

  const removeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.removeUserAvatar(
        window.localStorage.getItem("access_token")!
      )
        .then((resp) => setUpdateResult(resp))
        .then(() => MultiFuncs.AlertTimer("CustomAvatarAlert", true));
    }
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    setChangeAvatar(fileUploaded);
    setImageURL(URL.createObjectURL(fileUploaded));
    setChangeAvatarOptions(true);
  };

  return (
    <div className="h-full max-h-[60vh] flex flex-col justify-center items-center space-y-5 relative">
      <div className=" relative">
        {props?.user?.avatar?.data || props?.user?.avatar?.contentType ? (
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.15rem] relative">
            {changeAvatar ? (
              <img
                src={`${imageURL}`}
                alt=""
                className="object-contain rounded-sm max-h-[30rem]"
              />
            ) : (
              <img
                src={`data:${props?.user?.avatar?.contentType};base64,${props?.user?.avatar?.data}`}
                alt=""
                className="object-contain rounded-sm max-h-[30rem]"
              />
            )}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center ">
            {changeAvatar ? (
              <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.3rem] relative">
                <img
                  src={`${imageURL}`}
                  alt=""
                  className="object-contain rounded-sm max-h-[30rem]"
                />
              </div>
            ) : (
              <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[18rem] h-[18rem] relative p-[0.2rem]">
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-sm">
                  <PrettyProfileIcon size={70} fill={"white"} />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="absolute top-0 left-0">
          <button onClick={() => setShowAvatarSettings(!showAvatarSettings)}>
            <PrettyPictureOptions />
          </button>
          {showAvatarSettings && (
            <div className="">
              <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
                <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
                <div className="relative flex flex-col space-y-2 py-2 transition-all ease-out bg-gray-900 bg-opacity-95 rounded-sm">
                  <button
                    onClick={() => {
                      handleClick();
                      setShowAvatarSettings(false);
                    }}
                    className="px-4 py-2 flex flex-row space-x-8 justify-between"
                  >
                    <span className="text-gray-200 font-semibold text-md">
                      Change Photo
                    </span>
                    <div className="flex justify-center items-center">
                      <PrettyCameraIcon fill={"rgb(244,114,182)"} />
                    </div>
                  </button>

                  <div className="px-2">
                    <hr className="border-[0.05rem] border-[#F472B6]" />
                  </div>

                  <button
                    onClick={() => removeAvatarFunc()}
                    className="px-4 py-2 flex flex-row space-x-8 justify-between"
                  >
                    <span className="text-gray-200 font-semibold text-md">
                      Remove Photo
                    </span>
                    <div className="flex justify-center items-center h-full">
                      <PrettyTrashIcon fill={"rgb(244,114,182)"} size={20} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {changeAvatarOptions && (
          <div className="absolute top-0 right-0">
            <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
              <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
              <button
                onClick={() => {
                  setChangeAvatar("");
                  setChangeAvatarOptions(false);
                }}
                className="relative flex flex-col space-y-2 py-1.5 px-1 transition-all ease-out bg-gray-900 bg-opacity-95 rounded-sm"
              >
                <PrettyXIcon fill={"rgb(244, 114, 182)"} size={22} />
              </button>
            </div>
          </div>
        )}

        {changeAvatarOptions && (
          <div className="absolute bottom-0 right-0">
            <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
              <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
              <button
                onClick={() => {
                  changeAvatarFunc();
                  setChangeAvatarOptions(false);
                }}
                className="relative flex flex-col space-y-2 py-1.5 px-1 transition-all ease-out bg-gray-900 bg-opacity-95 rounded-sm"
              >
                <PrettyCheckIcon fill={"rgb(244, 114, 182)"} size={22} />
              </button>
            </div>
          </div>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={hiddenFileInput}
          onChange={handleChange}
        />
      </div>
      <div id="CustomAvatarAlert">
        <CustomAlert result={updateResult} />
      </div>
    </div>
  );
};

export default ProfileAvatar;
