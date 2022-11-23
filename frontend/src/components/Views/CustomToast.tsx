import React from "react";
import { ReturnFuncDto } from "../../Api/UtilsDtos/ReturnFuncDto";
import { PrettyCircleCheckIcon } from "../Prettys/PrettyIcons";

const CustomToast: React.FC<{ result: ReturnFuncDto }> = ({ result }) => {
  return (
    <div className="fixed top-[8rem] right-[3rem] -translatex-1/2 -translate-y-1/2 px-5 py-4 bg-slate-800 bg-opacity-90 z-20">
      <div className="flex flex-row space-x-3 items-center">
        <PrettyCircleCheckIcon size={20} fill={"rgb(244, 114, 182)"} />
        <p className="font-bold text-gray-200">{result?.message}</p>
      </div>
    </div>
  );
};

export default CustomToast;
