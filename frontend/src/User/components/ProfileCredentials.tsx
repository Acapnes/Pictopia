import { useState } from "react";
import {
  PrettyExtendedProfileButton,
  PrettySimpleProfileButton,
} from "../../components/PrettyButtons";
import ExtendedChangeProfile from "./ExtendedChangeProfile";
import SimpleProfile from "./SimpleProfile";

const ProfileCredentials = (props: any) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 ">
      <div className="flex justify-center items-center h-fit lg:sticky lg:top-10 relative">
        <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full shadow-lg p-[0.3rem] relative">
          <img
            src={`data:${props?.user?.avatar?.contentType};base64,${props?.user?.avatar?.data}`}
            alt=""
            className="object-contain rounded-full max-h-[30rem]"
          />
        </div>
      </div>
      <div className="w-full lg:col-span-3 shadow-lg bg-[#fafafa] space-y-4 rounded-sm px-8 py-3">
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
                    document.getElementById("SimpleTab")!.className = "hidden";
                    document.getElementById("ExtandedTab")!.className = "block";
                  }, 300);
                }
                setSelectedTab(1);
              }}
              className="rounded-lg w-fit h-fit bg-red-500"
            >
              <PrettyExtendedProfileButton
                text={"Extended"}
                selectedTab={selectedTab}
              />
            </button>
          </div>
        </div>
        <hr className="border-soft-black" />
        <div>
          <div id="SimpleTab" className={``}>
            <SimpleProfile user={props?.user} selectedTab={selectedTab} />
          </div>
          <div id="ExtandedTab" className={`hidden`}>
            <ExtendedChangeProfile selectedTab={selectedTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCredentials;
