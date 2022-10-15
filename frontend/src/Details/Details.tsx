import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PicDto } from "../Api/PicDtos/picDto";
import { PicAPI } from "../Api/PicApi";
import Grid from "../Grids/Grid";
import Comments from "./Comments";
import {
  PrettyComments,
  PrettyReport,
  PrettySave,
  PrettyShare,
} from "../components/PrettyButtons";
import Header from "../Menus/Header";
import SignComment from "./components/SignComment";
import HashTags from "./components/HashTags";

const Details = () => {
  const urlParam =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const [picture, setPicture] = useState<PicDto>(Object);
  const [commentsStatus, setCommentsStatus] = useState(false);

  const setFetchedPicture = async () => {
    setPicture(await PicAPI.getDetailPic(urlParam));
  };

  useEffect(() => {
    setFetchedPicture();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex flex-col py-10 lg:flex-row lg:px-40 lg:space-x-5">
        <img
          src={`data:${picture?.picture_file?.contentType};base64,${picture?.picture_file?.data}`}
          alt=""
          className="object-contain max-h-[70vh] mb-10 sticky top-0"
        />
        <div className="w-full px-10 mb-10 flex flex-col shadow-3xl">
          <div className="flex flex-row justify-between pt-5 items-center">
            <PrettyShare />
            <Link to={"/user/"}>
              <img
                src="https://avatars.githubusercontent.com/u/61701011?s=96&v=4"
                alt=""
                className="object-contain rounded-full"
              />
            </Link>
            <PrettySave />
          </div>

          <div className="w-full text-center  pb-4 pt-4">
            <p className="h-full font-bold text-4xl">{picture?.title}</p>
          </div>

          <div className="w-full h-full flex flex-col">
            <div className="max-h-[35vh] break-all overflow-y-auto my-5 px-5 indent-[4rem] ">
              {picture.description}
            </div>
          </div>
          <div className="pb-2">
            <HashTags />
          </div>
          <div className="flex flex-row justify-between py-5 items-center border-t-4 border-soft-black">
            <button>
              <PrettyReport />
            </button>

            <button onClick={() => setCommentsStatus(!commentsStatus)}>
              <PrettyComments />
            </button>
          </div>
          <div className={`${commentsStatus ? "block" : "hidden"} pb-5`}>
            <SignComment />
          </div>
          <div className={`${commentsStatus ? "block" : "hidden"} pb-5`}>
            <Comments />
          </div>
        </div>
      </div>
      <div className="w-full lg:col-span-2 md:col-span-2 ">
        <Grid />
      </div>
    </div>
  );
};

export default Details;
