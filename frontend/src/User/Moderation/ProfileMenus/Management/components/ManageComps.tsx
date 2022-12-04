import React, { useState } from "react";
import { UserDto } from "../../../../../Api/User/UserDtos/userDto";
import { PrettyRainbow } from "../../../../../components/Prettys/PrettyComponents";
import {
  PrettyCheckIcon,
  PrettyEyeIcon,
  PrettyXIcon,
} from "../../../../../components/Prettys/PrettyIcons";

const ManageEmail: React.FC<{ email: UserDto["email"] }> = ({ email }) => {
  const [userEmail, setuserEmail] = useState<string>(email);
  const [userPassword, setPassword] = useState<string>(email);

  const changeEmail = async () => {
    console.log(userEmail, userPassword);
  };

  return (
    <div className="flex-auto flex-col space-y-3">
      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* Email</p>
        <div className="flex flex-row space-x-2 justify-between items-center">
          <input
            type="email"
            defaultValue={email}
            onChange={(e) => setuserEmail(e.target.value)}
            className="w-full bg-transparent text-gray-200 outline-none px-2 py-1.5 rounded-sm border-[1.5px] border-pretty-rough-pink
          border-opacity-50 duration-200 focus:border-opacity-100"
          />
        </div>
      </div>

      {email !== userEmail && (
        <div className="flex flex-col space-y-1">
          <p className="text-gray-200">
            * Please enter your password to change your email address
          </p>
          <PasswordInput inputSetState={setPassword} />
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

const ManagePassword: React.FC<{}> = () => {
  const [userCurrentPassword, setUserCurrentPassword] = useState<string>("");
  const [userNewPassword, setUserNewPassword] = useState<string>("");

  const changePassword = async () => {
    console.log(userCurrentPassword, userNewPassword);
  };

  return (
    <div className="flex-auto flex-col space-y-3">
      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* Current Password</p>
        <PasswordInput
          placeHolder={"Your current password"}
          inputSetState={setUserCurrentPassword}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-gray-200 font-bold">* New Password</p>
        <PasswordInput
          placeHolder={"Your new password"}
          inputSetState={setUserNewPassword}
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
  inputSetState?: React.Dispatch<React.SetStateAction<string>>;
}> = ({ placeHolder, inputSetState }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex h-fit">
      <div
        className="w-full flex flex-row space-x-2 justify-between items-center border-[1.5px] border-pretty-rough-pink
      border-opacity-50 duration-200 focus:border-opacity-100"
      >
        <input
          onChange={(e) => inputSetState && inputSetState(e.target.value)}
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
