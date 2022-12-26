import { PicDto } from "../../Api/Pic/dtos/picDto";
import GridMenu from "./GridMenu";
import React from "react";
import { Masonry } from "@mui/lab";

const AliasGrid: React.FC<{ alias: PicDto[] }> = ({ alias }) => {
  return (
    <>
      {alias?.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center pb-14">
          <Masonry columns={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 6 }} spacing={2}>
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
          {/* <LoadingAnimation /> */}
        </div>
      )}
    </>
  );
};

export default AliasGrid;