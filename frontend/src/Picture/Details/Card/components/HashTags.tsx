import React from "react";
import { PicDto } from "../../../../Api/Pic/dtos/picDto";

const HashTags: React.FC<{ hashTags: PicDto["hashTags"] }> = () => {
  return (
    <div className="w-full flex flex-row">
      <button className="rounded-full border-[0.23rem] border-blue-600 border-opacity-70 px-2 py-1 text-blue-600 text-sm">
        #Medieval
      </button>
    </div>
  );
};

export default HashTags;
