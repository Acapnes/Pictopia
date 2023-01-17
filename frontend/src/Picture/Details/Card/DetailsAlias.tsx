import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PicAPI } from "../../../Api/Pic/PicApi";
import { PicDto } from "../../../Api/Pic/picDtos";
import { usePicturePaginationStore } from "../../../components/Zustand/store";
import { GridMenu } from "../../Grids/Grids";

const DetailsAlias: React.FC<{}> = () => {
  const [alias, setAlias] = useState<PicDto[]>([]);

  const currentPage = usePicturePaginationStore(
    (state: any) => state.currentPage
  );
  const postPerPage = usePicturePaginationStore(
    (state: any) => state.postPerPage
  );

  const params = useParams() as any;

  useEffect(() => {
    (async () => {
      setAlias([
        ...alias,
        ...(await PicAPI.getPicsAlias(params?.id, {
          currentPage: currentPage,
          postPerPage: postPerPage,
        })),
      ]);
    })();
  }, []);

  return (
    <div className="w-[50%] flex flex-col items-center">
      <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }} spacing={2}>
        {alias?.map((pic: PicDto, picIndex: number) => (
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
    </div>
  );
};

export default DetailsAlias;
