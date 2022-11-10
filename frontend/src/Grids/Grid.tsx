import { useEffect, useState } from "react";
import { PicDto } from "../Api/Pic/PicDtos/picDto";
import { PicAPI } from "../Api/Pic/PicApi";
import GridMenu from "./components/GridMenu";
import Notfound from "../components/Views/NotFound";

const Grid = () => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await PicAPI.getAllPics());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      {respPics.length > 0 ? (
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
      ) : (
        <Notfound/>
      )}
    </div>
  );
};

export default Grid;
