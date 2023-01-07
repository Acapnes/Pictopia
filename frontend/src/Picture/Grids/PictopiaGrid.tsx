import { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import React from "react";
import { Masonry } from "@mui/lab";
import { useParams } from "react-router-dom";
import { GridMenu } from "./Grids";

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
        ...(await PicAPI.getPicsByExplore({
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
    <div className="w-full flex flex-col items-center justify-center pb-14 px-1">
      <Masonry columns={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 6 }} spacing={2}>
        {pictures.map((pic: PicDto, picIndex: number) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center duration-300 hover:scale-105"
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
      {/* <LoadingAnimation /> */}
    </div>
  );
};

export default PictopiaGrid;
