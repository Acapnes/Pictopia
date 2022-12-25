import React from "react";
import {
  PrettyRainbowDiv,
  PrettyTip,
} from "../../../components/Prettys/PrettyComponents";
import { PrettyAlertIcon } from "../../../components/Prettys/PrettyIcons";
import Header from "../../../Menus/Header";

const PictureReport: React.FC<{}> = () => {
  return (
    <div className="min-w-screen min-h-screen bg-soft-black text-gray-200">
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        <div className="w-full max-w-[52rem] lg:my-10 flex-auto flex flex-col bg-gradient-to-br from-pretty-yellow to-pretty-rough-pink p-0.5 rounded-sm cursor-default">
          <div className="flex-auto h-full w-full bg-rough-soft-black bg-opacity-[97.5%]">
            <div className="w-full flex flex-col  px-5 py-4 space-y-5">
              <div className="flex flex-row space-x-1 items-center justify-center relative">
                <div className="absolute left-0">
                  <PrettyAlertIcon size={20} />
                </div>
                <p className="text-gray-300 text-2xl">Report Picture</p>
              </div>
              <PrettyTip
                advStyle="text-sm"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a
                  type specimen book. It has survived not only five centuries, but also the
                  leap into electronic typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the release of Letraset sheets containing 
                  Lorem Ipsum passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum."
              />
              <div className="w-full flex flex-col space-y-1">
                <p>Sign The Reason</p>
                <textarea className="w-full min-h-[10rem] max-h-[20rem] bg-light-soft-black   text-gray-300 outline-none px-1 py-1" />
              </div>
              <div className="w-full flex justify-between">
                <a
                  href="/"
                  className="border-2 rounded-sm w-fit px-2 py-1.5 border-light-soft-black transition duration-300 hover:border-2xl-extra-light-soft-black"
                >
                  <p className="text-sm">Cancel</p>
                </a>
                <button
                  onClick={() => {}}
                  className="border-2 rounded-sm w-fit px-2 py-1.5 border-light-soft-black transition duration-300 hover:border-2xl-extra-light-soft-black"
                >
                  <p className="text-sm">Send Report</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureReport;
