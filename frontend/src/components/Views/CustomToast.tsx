import React from "react";
import { PrettyCircleCheckIcon } from "../Prettys/PrettyIcons";
import { useToastStore } from "../Zustand/store";

const CustomToast: React.FC<{}> = () => {
  const toastState = useToastStore((state: any) => state.toastState);
  const toastMassage = useToastStore((state: any) => state.toastMassage);
  return (
    <>
      {toastState && (
        <div
          className={`fixed top-[7.5rem] right-[3rem] -translatex-1/2 -translate-y-1/2 px-5 py-4 bg-slate-800 bg-opacity-90 z-50 duration-700 fade-out`}
        >
          <div className="flex flex-row space-x-3 items-center">
            <PrettyCircleCheckIcon size={20} fill={"rgb(244, 114, 182)"} />
            <p className="font-bold text-gray-200">{toastMassage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomToast;
