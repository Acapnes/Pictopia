import { PicDto } from "../../Api/Pic/picDtos";
import React, { useEffect, useState } from "react";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyElements";
import { PicAPI } from "../../Api/Pic/PicApi";

const ActionlessGrid: React.FC<{}> = () => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await PicAPI.getAllPics());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="flex justify-center bg-soft-black">
      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:colmuns-6 gap-4 z-0 w-fit space-y-4 ">
        {respPics.map((pic, picIndex) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 "
            key={picIndex}
          >
            <img
              src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
              alt=""
              className="min-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const GridMenu: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <a href={`/detail/${picture?._id}`}>
      <div
        className="absolute bottom-0 w-full h-full transition duration-500 ease-in-out bg-gradient-to-t
        from-light-soft-black to-transparent text-white opacity-0 bg-opacity-0 group-hover:bg-opacity-50
        group-hover:opacity-90 group-hover:shadow-lg rounded-sm"
      >
        <div className="w-full h-full flex flex-col">
          <div className="absolute bottom-0 w-full h-fit flex flex-col py-2 px-4 space-y-1">
            <div className="flex flex-col space-y-[0.35rem] w-fit h-fit ">
              <PrettyCustomSizeAvatar
                avatar={{
                  data: picture?.authorPic?.avatar?.data,
                  contentType: picture?.authorPic?.avatar?.contentType,
                }}
                size={2.75}
              />
            </div>
            <div className="w-full">
              <p className="truncate break-all font-bold text-white text-sm">
                {picture?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export { ActionlessGrid, GridMenu };
