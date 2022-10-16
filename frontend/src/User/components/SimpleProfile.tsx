import React, { useEffect } from "react";
import { PrettyChangeProfileAvatar, PrettySaveChanges } from "../../components/PrettyButtons";

const SimpleProfile = (props: any) => {
  return (
    <div className={`h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10`}>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold">Email</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.email}
          readOnly
        />
      </div>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold">Username</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.username}
        />
      </div>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold">Name</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.name}
        />
      </div>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold">BirthDate</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.birthDate}
        />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-2 h-full">
        <div className="text-center flex items-center">
          <p className="font-semibold">Bio</p>
        </div>
        <textarea
          className="w-full h-full break-words px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800 resize-none"
          placeholder={props?.user?.bio}
        />
      </div>
      <div className="col-span-2 lg:col-span-4 w-full flex justify-between mt-5 ">
        <button>
          <PrettyChangeProfileAvatar />
        </button>
        <button>
          <PrettySaveChanges />
        </button>
      </div>
    </div>
  );
};

export default SimpleProfile;
