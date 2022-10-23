import {
  PrettyCameraIcon,
  PrettyTrashIcon,
} from "../../components/PrettyIcons";

const UserAvatarSettings = () => {
  return (
    <div className="">
      <div className="relative h-fit w-fit p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm">
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute"></span>
        <div className="relative flex flex-col space-y-2 py-2 transition-all ease-out bg-gray-900 bg-opacity-95 rounded-sm">
          <button className="px-4 py-2 flex flex-row space-x-8 justify-between">
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

          <button className="px-4 py-2 flex flex-row space-x-8 justify-between">
            <span className="text-gray-200 font-semibold text-md">
              Remove Photo
            </span>
            <div className="flex justify-center items-center h-full">
              <PrettyTrashIcon fill={"rgb(244,114,182)"} size={20}/>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAvatarSettings;
