import React, { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import Header from "../../Menus/Header";
import DetailsCard from "./Card/DetailsCard";
import { useParams } from "react-router-dom";
import { PrettyRainbowDiv } from "../../components/Prettys/PrettyComponents";
import { PrettyErrorIcon } from "../../components/Prettys/PrettyIcons";
import { AliasGrid } from "../Grids/Grids";

const Details: React.FC<{}> = () => {
  const params = useParams() as any;

  const [picture, setPicture] = useState<PicDto>(Object);
  const [alias, setAlias] = useState<PicDto[]>(Object);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [postPerPage, setPostPerPage] = useState<number>(20);

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    (async () => {
      setPicture(await PicAPI.getDetailPic(params?.id));
      setAlias(
        await PicAPI.getPicsAlias(params?.id, {
          currentPage: currentPage,
          postPerPage: postPerPage,
        })
      );
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center px-2 py-10">
        <DetailsPicture picture={picture} />
        <DetailsCard picture={picture} />
      </div>
      <AliasGrid alias={alias} />
    </>
  );
};

export default Details;

export { DetailsPicture };

const DetailsPicture: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <>
      {picture?.picture_file?.data || picture?.picture_file?.contentType ? (
        <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm shadow-lg w-fit h-fit relative">
          <img
            src={`data:${picture?.picture_file?.contentType};base64,${picture?.picture_file?.data}`}
            alt=""
            className="object-contain max-h-[70vh] 3xl:max-w-[55vw] rounded-sm bg-soft-black"
          />
        </div>
      ) : (
        <PrettyRainbowDiv
          advStyle="shadow-lg w-fit h-fit mb-10 relative rounded-md"
          advChildStyle="px-7 py-7 flex flex-col space-y-2 items-center rounded-md"
        >
          <div className="text-gray-200 text-2xl font-semibold ">
            <span>Picture not found</span>
          </div>
          <PrettyErrorIcon size={30} fill={"rgb(244,114,182)"} />
        </PrettyRainbowDiv>
      )}
    </>
  );
};
