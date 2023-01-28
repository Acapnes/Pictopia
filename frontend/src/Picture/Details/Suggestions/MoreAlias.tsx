import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PicAPI } from "../../../Api/Pic/PicApi";
import { PicDto } from "../../../Api/Pic/picDtos";
import { PrettySmallArrowDown } from "../../../components/Prettys/PrettyIcons";
import { GridMenu } from "../../Grids/Grids";
import { gql, useQuery } from "@apollo/client";

const MoreAlias: React.FC<{}> = () => {
  const [alias, setAlias] = useState<PicDto[]>([]);
  const params = useParams() as any;

  useEffect(() => {
    (async () => {
      setAlias(await PicAPI.getPicsAlias(params?.id));
    })();
  }, []);

  const GET_PIC_BY_ID = gql`
    query getPicById($id: String!) {
      getPicById(id: $id) {
        title
        description
        creationDate
        hashTags
        picture_file {
          data
          contentType
        }
        authorPic {
          username
          email
        }
        categories {
          title
          category_picture_file {
            contentType
            data
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_PIC_BY_ID, {
    variables: {
      id: "63a821fab63fd358e71d4949",
    },
  });

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="font-bold flex flex-row justify-between items-center space-x-2 px-0.5">
        <p className="whitespace-nowrap">More Alias</p>
        <div className="w-full flex flex-row space-x-1 items-center">
          <div className="w-full flex flex-wrap justify-end items-center overflow-hidden">
            <img
              src={`data:${data?.getPicById?.categories[0]?.category_picture_file?.contentType};base64,${data?.getPicById?.categories[0]?.category_picture_file?.data}`}
              className="w-[75%] h-[2rem] object-cover opacity-40 rounded-sm"
              alt=""
            />
          </div>
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

export default MoreAlias;
