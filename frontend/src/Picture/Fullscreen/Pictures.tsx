import React from "react";
import { useParams } from "react-router-dom";

const Pictures: React.FC<{}> = () => {
  const params = useParams() as any;

  return (
    <div className="min-w-screen min-h-screen h-full flex items-center justify-center bg-rough-soft-black overflow-hidden">
      {/* <img
        src={`data:${data?.getPicById?.picture_file?.contentType};base64,${data?.getPicById?.picture_file?.data}`}
        alt=""
        className="object-contain"
      /> */}
    </div>
  );
};

export default Pictures;
