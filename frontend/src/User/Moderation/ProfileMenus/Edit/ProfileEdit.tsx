import React from "react";
import { useState } from "react";
import { ModerationAPI } from "../../../../Api/User/ModerationApi";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../../../../Api/Utils/dtos/ReturnFuncDto";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyComponents";
import {
  PrettyCameraIcon,
  PrettyProfileIcon,
  PrettyTrashIcon,
} from "../../../../components/Prettys/PrettyIcons";
import { useToastStore } from "../../../../components/Zustand/store";

const ProfileEdit: React.FC<{ user: UserDto }> = ({ user }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBio, setInputBio] = useState("");
  const setToastState = useToastStore((state: any) => state.setToastState);

  const simpleUpdateProfile = async () => {
    await ModerationAPI.userEditProfile(
      window.localStorage.getItem("access_token")!,
      {
        username: inputUsername || user?.username,
        name: inputName || user?.name,
        bio: inputBio || user?.bio,
      }
    ).then(
      async (loginResp: ReturnFuncDto) => await setToastState(loginResp.message)
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5 p-5 rounded-sm bg-soft-black">
        <div className="relative flex">
          <ProfileAvatar avatar={user?.avatar} />
        </div>

        <div className="flex flex-col space-y-2 ">
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold text-gray-200">Username</p>
            </div>
            <input
              type="text"
              id="inputUsername"
              className="w-full px-3 py-2.5 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder={user?.username}
              onChange={(e) => setInputUsername(e.target.value)}
            />
            <p className="text-xs text-gray-400">
              Help people discover your account using a name you're familiar
              with, such as your first and last name, nickname, or business
              name.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold text-gray-200">Name</p>
            </div>
            <input
              type="text"
              id="inputName"
              className="w-full px-3 py-2.5 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder={user?.name}
              onChange={(e) => setInputName(e.target.value)}
            />
            <p className="text-xs text-gray-400">
              Your real name if you want to share.
            </p>
          </div>
          <div className="col-span-1 space-y-2 h-full pb-[4rem]">
            <div className="text-center flex items-center">
              <p className="font-semibold text-gray-200">Bio</p>
            </div>
            <textarea
              className="w-full h-full break-words px-3 py-2.5 outline-none bg-white shadow-xl rounded-sm text-gray-800 resize-none"
              placeholder={user?.bio}
              onChange={(e) => setInputBio(e.target.value)}
            />
            <p className="text-xs text-gray-400">Tell us about yourself.</p>
          </div>
          <div className="col-span-1 w-full flex justify-end">
            <PrettyRainbow
              advStyle="cursor-pointer"
              onclick={() => simpleUpdateProfile()}
            >
              <div className="px-2 py-0.5">
                <span className="text-white">Save</span>
              </div>
            </PrettyRainbow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;

const ProfileAvatar: React.FC<{ avatar: UserDto["avatar"] }> = ({ avatar }) => {
  const setToastState = useToastStore((state: any) => state.setToastState);
  const [imageURL, setImageURL] = useState<any>("null");
  const hiddenFileInput =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [changeAvatar, setChangeAvatar] = useState<File>();

  const handleClick = async () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const changeAvatarFunc = async (avatar: any) => {
    await ModerationAPI.changeUserAvatar(
      avatar,
      window.localStorage.getItem("access_token")!
    ).then(
      async (loginResp: ReturnFuncDto) => await setToastState(loginResp.message)
    );
  };

  const removeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await ModerationAPI.removeUserAvatar(
        window.localStorage.getItem("access_token")!
      ).then(
        async (loginResp: ReturnFuncDto) =>
          await setToastState(loginResp.message)
      );
    }
  };

  const handleChange = async (e: any) => {
    const fileUploaded = await e.target.files[0];
    setImageURL(URL.createObjectURL(fileUploaded));
    setChangeAvatar(fileUploaded);
    await changeAvatarFunc(fileUploaded);
  };

  return (
    <div className="max-h-[60vh] flex-auto flex flex-col space-y-4 items-center">
      <div className="w-fit flex flex-col relative space-y-2">
        <p className="font-bold text-gray-200">Avatar</p>
        {avatar?.data || avatar?.contentType ? (
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-0.5 relative">
            {changeAvatar ? (
              <img
                src={`${imageURL}`}
                alt=""
                className="object-contain rounded-sm max-h-[50vh]"
              />
            ) : (
              <img
                src={`data:${avatar?.contentType};base64,${avatar?.data}`}
                alt=""
                className="object-contain rounded-sm max-h-[50vh]"
              />
            )}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center ">
            {changeAvatar ? (
              <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-0.5 relative">
                <img
                  src={`${imageURL}`}
                  alt=""
                  className="object-contain rounded-sm max-h-[30rem]"
                />
              </div>
            ) : (
              <div className="flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm min-w-[18rem] h-[18rem] relative p-0.5">
                <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-sm">
                  <PrettyProfileIcon size={70} fill={"white"} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex flex-row space-x-2 items-center justify-center">
        <div className="flex flex-row space-x-3">
          <PrettyRainbow
            advStyle="cursor-pointer"
            onclick={() => handleClick()}
          >
            <PrettyCameraIcon fill={"white"} size={20} />
          </PrettyRainbow>
          <PrettyRainbow
            advStyle="cursor-pointer"
            onclick={() => removeAvatarFunc()}
          >
            <PrettyTrashIcon fill={"white"} size={20} />
          </PrettyRainbow>
        </div>
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </div>
  );
};
