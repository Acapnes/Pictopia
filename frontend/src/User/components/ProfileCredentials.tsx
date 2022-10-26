import React from "react";
import { useState } from "react";
import { UserAPI } from "../../Api/UserApi";
import CustomAlert from "../../components/CustomAlert";
import {
  PrettyAddAvatar,
  PrettyExtendedProfileButton,
  PrettyPictureOptions,
  PrettySimpleProfileButton,
} from "../../components/PrettyButtons";
import {
  PrettyCameraIcon,
  PrettyCheckIcon,
  PrettyProfileIcon,
  PrettyTrashIcon,
  PrettyXIcon,
} from "../../components/PrettyIcons";
import ExtendedChangeProfile from "./ExtendedChangeProfile";
import SimpleProfile from "./SimpleProfile";

const ProfileCredentials = (props: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAvatarSettings, setShowAvatarSettings] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState<any>();
  const [changeAvatarOptions, setChangeAvatarOptions] = useState(false);

  const [imageURL, setImageURL] = useState<any>("null");

  const [updateResult, setUpdateResult] = useState(Object);

  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    setChangeAvatar(fileUploaded);
    setImageURL(URL.createObjectURL(fileUploaded));
    setChangeAvatarOptions(true)
  };

  const changeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.changeUserAvatar(
        changeAvatar,
        window.localStorage.getItem("access_token")!
      ).then((resp) => setUpdateResult(resp));
    }
  };

  const removeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.removeUserAvatar(
        window.localStorage.getItem("access_token")!
      ).then((resp) => setUpdateResult(resp));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 p-5 lg:p-10">
      <div className="flex h-full max-h-[60vh] justify-center flex-col space-y-5 items-center lg:sticky lg:top-10 relative">
        {props?.user?.avatar?.data || props?.user?.avatar?.contentType ? (
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full shadow-lg p-[0.3rem] relative">
            {changeAvatar ? (
              <img
                src={`${imageURL}`}
                alt=""
                className="object-contain rounded-full max-h-[30rem]"
              />
            ) : (
              <img
                src={`data:${props?.user?.avatar?.contentType};base64,${props?.user?.avatar?.data}`}
                alt=""
                className="object-contain rounded-full max-h-[30rem]"
              />
            )}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center ">
            {changeAvatar ? (
              <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full shadow-lg p-[0.3rem] relative">
                <img
                  src={`${imageURL}`}
                  alt=""
                  className="object-contain rounded-full max-h-[30rem]"
                />
              </div>
            ) : (
              <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full min-w-[12rem] h-[12rem] relative p-[0.2rem]">
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-full">
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

                  <button onClick={()=> removeAvatarFunc()} className="px-4 py-2 flex flex-row space-x-8 justify-between">
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
                  setChangeAvatar("")
                  setChangeAvatarOptions(false)
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
                  changeAvatarFunc()
                  setChangeAvatarOptions(false)
                }}
                className="relative flex flex-col space-y-2 py-1.5 px-1 transition-all ease-out bg-gray-900 bg-opacity-95 rounded-sm"
              >
                <PrettyCheckIcon fill={"rgb(244, 114, 182)"} size={22} />
              </button>
            </div>
          </div>
        )}

        <div className="">
          <CustomAlert result={updateResult} />
        </div>
      </div>
      <div className="w-full h-fit lg:col-span-3 bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.2rem]">
        <div className="w-full h-full bg-soft-black bg-opacity-95 space-y-4 rounded-sm px-8 py-5">
          <div className="w-full h-[3rem] flex flex-row justify-around">
            <div className="h-full flex items-center">
              <button
                onClick={() => {
                  if (selectedTab === 1) {
                    document.getElementById("ExtandedTab")!.className =
                      "transform -translate-x-8 transition opacity-0 duration-300 ease-in-out";
                    setTimeout(() => {
                      document.getElementById("SimpleTab")!.className = "block";
                      document.getElementById("ExtandedTab")!.className =
                        "hidden";
                    }, 300);
                  }
                  setSelectedTab(0);
                }}
                className="rounded-sm"
              >
                <PrettySimpleProfileButton
                  text={"Simple"}
                  selectedTab={selectedTab}
                />
              </button>
            </div>

            <div className="h-full flex items-center">
              <button
                onClick={() => {
                  if (selectedTab === 0) {
                    document.getElementById("SimpleTab")!.className =
                      "transform translate-x-8 transition duration-300 opacity-0 ease-in-out";
                    setTimeout(() => {
                      document.getElementById("SimpleTab")!.className =
                        "hidden";
                      document.getElementById("ExtandedTab")!.className =
                        "block";
                    }, 300);
                  }
                  setSelectedTab(1);
                }}
                className="rounded-lg w-fit h-fit"
              >
                <PrettyExtendedProfileButton
                  text={"Extended"}
                  selectedTab={selectedTab}
                />
              </button>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div>
            <div id="SimpleTab" className={``}>
              <SimpleProfile
                user={props?.user}
                selectedTab={selectedTab}
                updateResult={updateResult}
              />
            </div>
            <div id="ExtandedTab" className={`hidden`}>
              <ExtendedChangeProfile selectedTab={selectedTab} />
            </div>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCredentials;
