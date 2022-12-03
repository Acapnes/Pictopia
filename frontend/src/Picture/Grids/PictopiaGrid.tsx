import { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/PicDtos/picDto";
import { PicAPI } from "../../Api/Pic/PicApi";
import GridMenu from "./components/GridMenu";
import React from "react";
import { Masonry } from "@mui/lab";

const PictopiaGrid: React.FC<{ currentPage: number; postPerPage: number }> = ({
  currentPage,
  postPerPage,
}) => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics([
      ...respPics,
      ...(await PicAPI.getPicsByCategory({
        currentPage: currentPage,
        postPerPage: postPerPage,
      })),
    ]);
  };

  useEffect(() => {
    fetchAndSetPics();
  }, [currentPage]);

  return (
    <div className="w-full flex justify-center">
      <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3}>
        {respPics.map((pic, picIndex) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 duration-300 hover:scale-105 "
            key={picIndex}
          >
            <img
              loading="lazy"
              src={`data:${pic.picture_file.contentType};base64,${pic.picture_file.data}`}
              alt=""
              className="min-w-full rounded-sm"
            />
            <GridMenu picture={pic} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default PictopiaGrid;
