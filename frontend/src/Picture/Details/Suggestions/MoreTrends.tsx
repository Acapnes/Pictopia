import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PicAPI } from "../../../Api/Pic/PicApi";
import { PicDto } from "../../../Api/Pic/picDtos";
import { PrettySmallArrowDown } from "../../../components/Prettys/PrettyIcons";
import { GridMenu } from "../../Grids/Grids";

const MoreTrends: React.FC<{}> = () => {
  const [alias, setAlias] = useState<PicDto[]>([]);

  const params = useParams() as any;

  useEffect(() => {
    (async () => {
      setAlias(await PicAPI.getPicsAlias(params?.id));
    })();
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <div className="font-bold flex flex-row justify-between space-x-2">
        <p>More Trends🔥</p>
        <div className="flex flex-row space-x-1">
          <button>
            <PrettySmallArrowDown />
          </button>
        </div>
      </div>
      <div className="pl-2">
        <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }} spacing={1}>
          {alias?.map((pic: PicDto, picIndex: number) => (
            <div
              className="h-48 group relative flex flex-col justify-center overflow-hidden"
              key={picIndex}
            >
              <img
                loading="lazy"
                src={`data:${pic?.picture_file?.contentType};base64,${pic?.picture_file?.data}`}
                alt=""
                className="w-full h-full object-cover rounded-sm duration-300 group-hover:scale-125"
              />
              <GridMenu picture={pic} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default MoreTrends;
