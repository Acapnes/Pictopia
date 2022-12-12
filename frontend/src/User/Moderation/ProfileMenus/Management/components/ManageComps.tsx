import React, { useRef, useState } from "react";
import { ModerationAPI } from "../../../../../Api/User/ModerationApi";
import { UserDto } from "../../../../../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../../../../../Api/Utils/ReturnFuncDto";
import { PrettyRainbow } from "../../../../../components/Prettys/PrettyComponents";
import { PrettyEyeIcon } from "../../../../../components/Prettys/PrettyIcons";
import { useToastStore } from "../../../../../components/Zustand/store";

const ManageEmail: React.FC<{ email: UserDto["email"] }> = ({ email }) => {
  const userNewEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const setToastState = useToastStore((state: any) => state.setToastState);

  const changeEmail = async () => {
    await ModerationAPI.userChangeEmail(
      window.localStorage.getItem("access_token")!,
      {
        email: email,
        newEmail: userNewEmailRef.current!.value!,
        password: userPasswordRef.current!.value,
      }
    ).then(
      async (loginResp: ReturnFuncDto) => await setToastState(loginResp.message)
    );
  };

  return (
    <div className="flex-auto flex-col space-y-3">
      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* Email</p>
        <div className="flex flex-row space-x-2 justify-between items-center">
          <input
            type="email"
            defaultValue={email}
            disabled
            className="w-full bg-transparent text-gray-200 outline-none px-2 py-1.5 rounded-sm border-[1.5px] border-pretty-rough-pink
          border-opacity-50 duration-200 focus:border-opacity-100"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* New Email</p>
        <div className="flex flex-row space-x-2 justify-between items-center">
          <input
            ref={userNewEmailRef}
            type="email"
            className="w-full bg-transparent text-gray-200 outline-none px-2 py-1.5 rounded-sm border-[1.5px] border-pretty-rough-pink
          border-opacity-50 duration-200 focus:border-opacity-100"
          />
        </div>
      </div>

      {true && (
        <div className="flex flex-col space-y-1">
          <p className="text-gray-200">
            * Please enter your password to change your email address
          </p>
          <PasswordInput refInput={userPasswordRef} />
          <div className="h-1"></div>
          <PrettyRainbow
            onclick={() => changeEmail()}
            advStyle="w-fit h-fit text-gray-200 rounded-sm"
            advChildStyle="rounded-sm"
          >
            <p>Save</p>
          </PrettyRainbow>
        </div>
      )}
    </div>
  );
};

const ManagePassword: React.FC<{ email: UserDto["email"] }> = ({ email }) => {
  const userCurrentPassword = useRef<HTMLInputElement>(null);
  const userNewPassword = useRef<HTMLInputElement>(null);
  const setToastState = useToastStore((state: any) => state.setToastState);

  const changePassword = async () => {
    await ModerationAPI.userChangePassword(
      window.localStorage.getItem("access_token")!,
      {
        email: email,
        password: userCurrentPassword.current!.value,
        newPassword: userNewPassword.current!.value!,
      }
    ).then(
      async (loginResp: ReturnFuncDto) => await setToastState(loginResp.message)
    );
  };

  return (
    <div className="flex-auto flex-col space-y-3">
      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* Current Password</p>
        <PasswordInput
          refInput={userCurrentPassword}
          placeHolder={"Your current password"}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* New Password</p>
        <PasswordInput
          refInput={userNewPassword}
          placeHolder={"Your new password"}
        />
      </div>
      {userCurrentPassword && userNewPassword && (
        <PrettyRainbow
          onclick={() => changePassword()}
          advStyle="w-fit h-fit text-gray-200 rounded-sm"
          advChildStyle="rounded-sm"
        >
          <p>Save</p>
        </PrettyRainbow>
      )}
    </div>
  );
};

const DeleteAccount: React.FC<{}> = () => {
  return (
    <div className="flex-auto flex flex-col space-y-3 items-center justify-center">
      <PrettyRainbow
        onclick={() => (window.location.href = "deletion")}
        advStyle="w-fit h-fit text-gray-200 rounded-sm"
        advChildStyle="rounded-sm px-6 py-3"
      >
        <p>Delete Account</p>
      </PrettyRainbow>
    </div>
  );
};

const PasswordInput: React.FC<{
  placeHolder?: string;
  refInput?: React.RefObject<HTMLInputElement>;
}> = ({ placeHolder, refInput }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex h-fit">
      <div
        className="w-full flex flex-row space-x-2 justify-between items-center border-[1.5px] border-pretty-rough-pink
      border-opacity-50 duration-200 focus:border-opacity-100"
      >
        <input
          ref={refInput}
          type={showPassword ? "text" : "password"}
          className="w-full bg-transparent text-gray-200 outline-none px-2 py-1.5 rounded-sm"
          placeholder={placeHolder}
        />
        <div
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <PrettyEyeIcon show={showPassword} fill={"white"} />
        </div>
      </div>
    </div>
  );
};

export { ManageEmail, ManagePassword, DeleteAccount, PasswordInput };
  function setToastState(message: string): any {
    throw new Error("Function not implemented.");
  }

