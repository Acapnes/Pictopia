import { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import React from "react";
import { Masonry } from "@mui/lab";
import { useParams } from "react-router-dom";
import { GridMenu } from "./Grids";
import { usePaginationStore } from "../../components/Zustand";

const PictopiaGrid: React.FC<{}> = () => {
  const [pictures, setPictures] = useState<PicDto[]>([]);
  const [picturesLoading, setPicturesLoading] = useState<boolean>(false);
  const params = useParams();

  const fetchAndSetPics = async () => {
    setPicturesLoading(true);
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
    setPicturesLoading(false);
  };

  const currentPage = usePaginationStore((state: any) => state.currentPage);

  const postPerPage = usePaginationStore((state: any) => state.postPerPage);

  useEffect(() => {
    !picturesLoading && fetchAndSetPics();
  }, [currentPage]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 5 }} spacing={3}>
        {pictures.map((pic: PicDto, picIndex: number) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center duration-300 hover:scale-[105%] overflow-hidden"
            key={picIndex}
          >
            <img
              loading="lazy"
              src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
              alt=""
              className="min-w-full rounded-sm  "
            />
            <GridMenu picture={pic} />
          </div>
        ))}
      </Masonry>
      {/* {picturesLoading && <LoadingAnimation />} */}
    </div>
  );
};

export default PictopiaGrid;

export { LoadingAnimation };

const LoadingAnimation: React.FC<{}> = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[2rem] h-[2.5rem] flex flex-row my-5">
        <div className="h-full w-full animate-[bounce_1.5s_infinite_100ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_200ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_300ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
      </div>
      <div className="w-[2rem] h-[2.5rem] flex flex-row my-5">
        <div className="h-full w-full animate-[bounce_1.5s_infinite_400ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_500ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
        <div className="h-full w-full animate-[bounce_1.5s_infinite_600ms] bg-gradient-to-b from-pretty-yellow to-pretty-rough-pink"></div>
      </div>
    </div>
  );
};
