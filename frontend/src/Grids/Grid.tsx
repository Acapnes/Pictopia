import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PicDto } from "../Api/Dto/picDto";
import { PicAPI } from "../Api/PicReqs";
import GridMenu from "./GridMenu";

const Grid = () => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await PicAPI.getAllPics());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:colmuns-6 gap-0 z-0 w-fit ">
        {respPics.map((pic, picIndex) => (
          <Link
            to={`/detail/${pic._id}`}
            state={{ pic }}
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 "
            key={picIndex}
          >
            <img
              src={`data:${pic.picture_file.contentType};base64,${pic.picture_file.data}`}
              alt=""
              className="min-w-full"
            />
            <GridMenu pic={pic} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Grid;
