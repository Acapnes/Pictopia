import React, { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { PicAPI } from "../../Api/Pic/PicApi";
import Header from "../../Menus/Header";
import DetailsCard from "./Card/DetailsCard";
import DetailsPicture from "./Card/DetailsPicture";
import { useParams } from "react-router-dom";
import AliasGrid from "../Grids/AliasGrid";

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
    <div className="min-h-screen w-full h-full flex flex-col bg-soft-black overflow-x-hidden">
      <Header />
      <div className="min-h-[70vh] flex flex-col space-y-4 justify-center items-center px-2 py-10">
        <DetailsPicture picture={picture} />
        <DetailsCard picture={picture} />
      </div>
      <AliasGrid alias={alias} />
    </div>
  );
};

export default Details;
