import { useEffect, useState } from "react";
import { PicDto } from "../Api/PicDtos/picDto";
import { PicAPI } from "../Api/PicApi";

const SearchMenuPicsGrid = () => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await PicAPI.getAllPics());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="flex justify-center bg-soft-black bg-opacity-95">
      <div className="columns-1 sm:columns-1 md:columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 3xl:columns-4 4xl:colmuns-5 gap-4 z-0 w-fit space-y-4 ">
        {respPics.map((pic, picIndex) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 "
            key={picIndex}
          >
            <img
              src={`data:${pic.picture_file.contentType};base64,${pic.picture_file.data}`}
              alt=""
              className="min-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMenuPicsGrid;
