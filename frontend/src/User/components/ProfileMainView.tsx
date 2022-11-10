import React from "react";
import { useState } from "react";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import {
  PrettyExtendedProfileButton,
  PrettySimpleProfileButton,
} from "../../components/Prettys/PrettyButtons";
import ExtendedChangeProfile from "./ExtendedChangeProfile";
import ProfileAvatar from "./ProfileAvatar";
import SimpleProfile from "./SimpleProfile";

const ProfileMainView = (props: any) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabChange = (SelectedTab: number) => {
    switch (SelectedTab) {
      case 0: {
        MultiFuncs.TabChange("ExtandedTab", "SimpleTab", true);
        break;
      }
      case 1: {
        MultiFuncs.TabChange("SimpleTab", "ExtandedTab", false);
        break;
      }
    }
    setSelectedTab(SelectedTab);
  };

  return (
    <div className="grid grid-cols-1 gap-10 p-5 lg:p-10">
      <ProfileAvatar user={props?.user} />
      <div className="w-full h-fit lg:col-span-3 rounded-sm shadow-lg p-[0.2rem] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
        <div className="w-full h-full bg-soft-black bg-opacity-95 space-y-4 rounded-sm px-8 py-5">
          <div className="w-full h-[3rem] flex flex-row justify-around">
            <div className="h-full flex items-center">
              <button
                onClick={() => {
                  if (selectedTab === 1) tabChange(0);
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
                  if (selectedTab === 0)
                    MultiFuncs.TabChange("SimpleTab", "ExtandedTab", false);
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
              <SimpleProfile user={props?.user} selectedTab={selectedTab} />
            </div>
            <div id="ExtandedTab" className={`hidden`}>
              <ExtendedChangeProfile selectedTab={selectedTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainView;
