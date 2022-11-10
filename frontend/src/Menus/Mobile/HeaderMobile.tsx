import React from "react";
import { PrettyHomeButton } from "../../components/Prettys/PrettyButtons";
import {
  PrettyHomeIcon,
  PrettySearchIcon,
} from "../../components/Prettys/PrettyIcons";
import HeaderAccount from "../Account/HeaderAccount";
import HeaderOptions from "../Options/HeaderOptions";
import SearchBar from "../Search/SearchBar";

const HeaderMobile = (props: any) => {
  return (
    <div className="fixed md:w-[90vw] bottom-3 left-1/2 -translate-x-1/2">
      <div className=" rounded-sm p-[0.12rem]">
        <div className="bg-slate-900 bg-opacity-90 rounded-sm">
          <div className="px-5 py-2 ">
            <div className="flex flex-row items-center space-x-5 h-fit">
              <PrettyHomeButton />
              <SearchBar />
              <HeaderOptions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
