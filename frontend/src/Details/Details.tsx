import { useEffect, useState } from "react";
import { PicDto } from "../Api/PicDtos/picDto";
import { PicAPI } from "../Api/PicApi";
import Grid from "../Grids/Grid";
import Header from "../Menus/Header";
import PictureDetailsCard from "./components/PictureDetailsCard";

const Details = () => {
  const urlParam =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const [picture, setPicture] = useState<PicDto>(Object);

  const setFetchedPicture = async () => {
    setPicture(await PicAPI.getDetailPic(urlParam));
  };

  useEffect(() => {
    setFetchedPicture();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-soft-black">
      <Header />
      <div className="min-h-[70vh] flex flex-col  justify-center items-center py-10 3xl:flex-row 3xl:px-10 3xl:space-x-5 lg:px-3 ">
        <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-sm shadow-lg p-[0.2rem] w-fit h-fit mb-10 relative">
          <img
            src={`data:${picture?.picture_file?.contentType};base64,${picture?.picture_file?.data}`}
            alt=""
            className="object-contain max-h-[70vh] max-w-[60vw] rounded-sm"
          />
        </div>
        <PictureDetailsCard picture={picture} />
      </div>
      <div className="w-full lg:col-span-2 md:col-span-2 ">
        <Grid />
      </div>
    </div>
  );
};

export default Details;
