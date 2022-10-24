import { useEffect, useState } from "react";
import { PicDto } from "../Api/PicDtos/picDto";
import { PicAPI } from "../Api/PicApi";
import GridMenu from "./components/GridMenu";

const Grid = () => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await PicAPI.getAllPics());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="flex justify-center mt-3">
      <div className="columns-1 sm:columns-2  md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:colmuns-6 gap-5 space-y-5 z-0 w-fit px-4 py-2">
        {respPics.map((pic, picIndex) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 duration-300 hover:scale-105"
            key={picIndex}
          >
            <img
              src={`data:${pic.picture_file.contentType};base64,${pic.picture_file.data}`}
              alt=""
              className="min-w-full rounded-sm"
            />
            <GridMenu pic={pic} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
