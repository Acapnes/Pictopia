import { useState } from "react";
import { PrettyProfileSelectionButton } from "../../../components/Prettys/PrettyButtons";

const ProfileSelections = (props: any) => {
  const [selectedTab, setSelectedTab] = useState<string>();

  const tabChange = (SelectedTab: string) => {
    setSelectedTab(SelectedTab);
  };

  return (
    <div className="h-full min-w-[15rem] grid grid-cols-1 gap-10 pt-10 pb-5 lg:pb-0">
      <div className="w-full flex justify-center">
        <div className="w-full h-fit rounded-sm">
          <div className="w-full h-full rounded-sm">
            <div className="w-full flex flex-row justify-between space-x-5">
              <div className="h-full flex flex-col space-y-3">
                <a href="/profile/edit" className="rounded-sm">
                  <PrettyProfileSelectionButton text={"Public Profile"} />
                </a>
                <a
                  href="/profile/privacy"
                  onClick={() => tabChange("Personal Information")}
                  className="rounded-lg w-fit h-fit"
                >
                  <PrettyProfileSelectionButton text={"Personal Information"} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelections;
