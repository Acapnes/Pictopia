import React, { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/PicDtos/picDto";
import { PicAPI } from "../../Api/Pic/PicApi";
import Header from "../../Menus/Header";
import DetailsCard from "./Card/DetailsCard";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import DetailsPicture from "./Card/DetailsPicture";

const Details: React.FC<{}> = () => {
  const [picture, setPicture] = useState<PicDto>(Object);

  const setFetchedPicture = async () => {
    setPicture(await PicAPI.getDetailPic(await MultiFuncs.UrlParam()));
  };

  useEffect(() => {
    setFetchedPicture();
  }, []);

  return (
    <div className="min-h-screen w-full h-full flex flex-col bg-soft-black">
      <Header />
      <div className="min-h-[70vh] flex flex-col justify-center items-center px-2 py-10">
        <DetailsPicture picture={picture} />
        <DetailsCard picture={picture} />
      </div>
      {/* <Grid /> */}
    </div>
  );
};

export default Details;
