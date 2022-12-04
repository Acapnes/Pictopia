import React from "react";
import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import {
  ManageEmail,
  ManagePassword,
  DeleteAccount,
} from "./components/ManageComps";

const Management: React.FC<{ user: UserDto }> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.15rem] rounded-sm">
      <div className="flex flex-col space-y-10 py-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-5 lg:space-y-0 px-5">
          <div className="w-full lg:w-[20rem] flex flex-col space-y-1 items-center justify-center text-center text-gray-200">
            <p className="text-2xl">Login Email</p>
            <p>The email you use to access Pictopia</p>
          </div>
          <ManageEmail email={user?.email} />
        </div>

        <hr className="w-full border-pretty-pink" />

        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-5 lg:space-y-0 px-5">
          <div className="w-full lg:w-[20rem] flex flex-col space-y-1 items-center justify-center text-center text-gray-200">
            <p className="text-2xl">Account Password</p>
            <p>You can change your account password from here</p>
          </div>
          <ManagePassword />
        </div>

        <hr className="w-full border-pretty-pink" />

        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-5 lg:space-y-0 px-5">
          <div className="w-full lg:w-[20rem] flex flex-col space-y-1 items-center justify-center text-center text-gray-200">
            <p className="text-2xl text-red-500">Account Deletion</p>
            <p className="text-red-400">
              Please note that once you remove your account, it will delete all
              pictures that you've posted
            </p>
          </div>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Management;
