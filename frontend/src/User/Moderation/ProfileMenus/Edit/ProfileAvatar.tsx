import React, { useState } from "react";
import { ModerationAPI } from "../../../../Api/User/ModerationApi";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../../../components/Prettys/PrettyComponents";
import {
  PrettyCameraIcon,
  PrettyProfileIcon,
  PrettyTrashIcon,
} from "../../../../components/Prettys/PrettyIcons";

const ProfileAvatar: React.FC<{ user: UserDto }> = ({ user }) => {
  const [imageURL, setImageURL] = useState<any>("null");
  const hiddenFileInput = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [changeAvatar, setChangeAvatar] = useState<File>();

  const handleClick = async () => {
    hiddenFileInput.current ? hiddenFileInput.current.click() : alert("Error!");
  };

  const changeAvatarFunc = async (avatar: any) => {
    await ModerationAPI.changeUserAvatar(
      avatar,
      window.localStorage.getItem("access_token")!
    );
  };

  const removeAvatarFunc = async () => {
    if (window.localStorage.getItem("access_token")) {
      await ModerationAPI.removeUserAvatar(
        window.localStorage.getItem("access_token")!
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
    <div className="h-full max-h-[60vh] flex flex-col space-y-4 items-center">
      <div className="w-fit flex flex-col relative space-y-2">
        {user?.avatar?.data || user?.avatar?.contentType ? (
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.15rem] relative">
            {changeAvatar ? (
              <img
                src={`${imageURL}`}
                alt=""
                className="object-contain rounded-sm max-h-[30rem]"
              />
            ) : (
              <img
                src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.data}`}
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

export default ProfileAvatar;
