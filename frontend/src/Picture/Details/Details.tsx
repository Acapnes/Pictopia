import React, { useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/dtos/picDto";
import { PicAPI } from "../../Api/Pic/PicApi";
import Header from "../../Menus/Header";
import DetailsCard from "./Card/DetailsCard";
import DetailsPicture from "./Card/DetailsPicture";
import { useParams } from "react-router-dom";

const Details: React.FC<{}> = () => {
  const [picture, setPicture] = useState<PicDto>(Object);
  const params = useParams() as any;

  const setFetchedPicture = async () => {
    setPicture(await PicAPI.getDetailPic(params?.id));
  };

  useEffect(() => {
    setFetchedPicture();
  }, []);

  return (
    <div className="min-h-screen w-full h-full flex flex-col bg-soft-black">
      <Header />
      <div className="min-h-[70vh] flex flex-col space-y-4 justify-center items-center px-2 py-10">
        <DetailsPicture picture={picture} />
        <DetailsCard picture={picture} />
      </div>
      {/* <Grid /> */}
    </div>
  );
};

export default Details;
