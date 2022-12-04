import React from "react";
import { PrettyRainbow } from "../../../../../components/Prettys/PrettyComponents";
import { PrettyTip } from "../../../../../components/Prettys/PrettyElements";
import Header from "../../../../../Menus/Header";
import { PasswordInput } from "./ManageComps";

const AccountDeletion: React.FC<{}> = () => {
  return (
    <div className="min-h-screen w-full h-full bg-soft-black flex flex-col space-y-10 md:pb-3">
      <div className="flex-none">
        <Header />
      </div>
      <div className="w-full flex-auto flex justify-center">
        <div className="w-[50rem] h-full flex flex-col space-y-5 ">
          <p className="text-3xl text-gray-200 font-bold text-center">
            Account Deletion
          </p>
          <PrettyTip
            text="To remove your ArtStation account, please let us know why you'd like to leave so that we can make a better product.
             Please note that once you remove your account, it will delete all artwork that you've posted. You can re-register again at any time."
          />
          <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm p-0.5">
            <div className="w-full flex flex-col space-y-4 py-5 px-4 bg-soft-black rounded-sm text-gray-200">
              <p className="text-lg">
                Please provide a reason for cancelling your account
              </p>
              <div className="flex flex-row space-x-2 items-center">
                <input
                  type="checkbox"
                  className="accent-pink-500 w-3.5 h-3.5"
                />
                <p>I have a duplicate account</p>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <input
                  type="checkbox"
                  className="accent-pink-500 w-3.5 h-3.5"
                />
                <p>I am getting too many emails</p>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <input
                  type="checkbox"
                  className="accent-pink-500 w-3.5 h-3.5"
                />
                <p>I am using a different portfolio service</p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2 items-center">
                  <input
                    type="checkbox"
                    className="accent-pink-500 w-3.5 h-3.5"
                  />
                  <p>Other reason</p>
                </div>
                <textarea
                  className="outline-none max-h-[10rem]"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p>*Please provide your password</p>
                <PasswordInput />
              </div>
              <div>
                <PrettyRainbow>
                  <p className="text-red-400 group-hover:text-gray-200">
                    Delete Account
                  </p>
                </PrettyRainbow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
