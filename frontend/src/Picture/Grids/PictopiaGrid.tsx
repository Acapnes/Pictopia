import { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { PicAPI } from "../../Api/Pic/PicApi";
import GridMenu from "./components/GridMenu";
import React from "react";
import { Masonry } from "@mui/lab";
import { useParams } from "react-router-dom";

const PictopiaGrid: React.FC<{ currentPage: number; postPerPage: number }> = ({
  currentPage,
  postPerPage,
}) => {
  const [pictures, setPictures] = useState<PicDto[]>([]);
  const params = useParams();

  const fetchAndSetPics = async () => {
    if (params?.category) {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsByCategory({
          category: params?.category,
          currentPage: currentPage,
          postPerPage: postPerPage,
        })),
      ]);
    } else if (params?.input) {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsBySeachInput({
          input: params?.input,
          currentPage: currentPage,
          postPerPage: postPerPage,
        })),
      ]);
    } else if (params?.tag) {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsBySeachInput({
          input: `#${params!.tag}`,
          currentPage: currentPage,
          postPerPage: postPerPage,
        })),
      ]);
    } else {
      setPictures([
        ...pictures,
        ...(await PicAPI.getPicsByCategory({
          category: "Explore",
          currentPage: currentPage,
          postPerPage: postPerPage,
        })),
      ]);
    }
  };

  useEffect(() => {
    fetchAndSetPics();
  }, [currentPage]);

  return (
    <div className="w-full flex justify-center">
      <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 6 }} spacing={2}>
        {pictures.map((pic: PicDto, picIndex: number) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 duration-300 hover:scale-105 "
            key={picIndex}
          >
            <img
              loading="lazy"
              src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
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
