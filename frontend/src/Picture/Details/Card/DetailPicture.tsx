import React from "react";
import { PicDto } from "../../../Api/Pic/PicDtos/picDto";
import { PrettyErrorIcon } from "../../../components/Prettys/PrettyIcons";

const DetailPicture: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <div>
      {picture?.picture_file?.data || picture?.picture_file?.contentType ? (
        <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-[0.2rem] rounded-sm shadow-lg w-fit h-fit mb-10 relative">
          <img
            src={`data:${picture?.picture_file?.contentType};base64,${picture?.picture_file?.data}`}
            alt=""
            className="object-contain max-h-[70vh] 3xl:max-w-[55vw] rounded-sm"
          />
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.2rem] w-fit h-fit mb-10 relative">
          <div className="w-full h-full bg-soft-black items-center space-y-5 p-5 flex flex-col">
            <div className="text-gray-200 text-2xl font-semibold">
              Picture not found
            </div>
            <PrettyErrorIcon size={30} fill={"rgb(244,114,182)"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPicture;
