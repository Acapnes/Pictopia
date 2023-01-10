import React, { Suspense, useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import DetailsCard from "./Card/DetailsCard";
import { useParams } from "react-router-dom";
import { AliasGrid } from "../Grids/Grids";
import { usePicturePaginationStore } from "../../components/Zustand/store";
import { LoadingAnimation } from "../Grids/PictopiaGrid";
import { SuspenseVeiw } from "../../components/Prettys/PrettyViews";

const DetailsPicture = React.lazy(() => import("./Card/DetailsPicture"));

const Details: React.FC<{}> = () => {
  const params = useParams() as any;
  const [aliasLoading, setAliasLoading] = useState<boolean>(false);

  const currentPage = usePicturePaginationStore(
    (state: any) => state.currentPage
  );
  const postPerPage = usePicturePaginationStore(
    (state: any) => state.postPerPage
  );

  const [picture, setPicture] = useState<PicDto>(Object);
  const [alias, setAlias] = useState<PicDto[]>([]);

  useEffect(() => {
    (async () => {
      setPicture(await PicAPI.getDetailPic(params?.id));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!aliasLoading) {
        setAliasLoading(true);

        setAlias(
          await PicAPI.getPicsAlias(params?.id, {
            currentPage: currentPage,
            postPerPage: postPerPage,
          })
        );

        setAliasLoading(false);
      }
    })();
  }, [currentPage]);

  return (
    <div className="flex flex-col space-y-5 px-2 py-10">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <DetailsPicture picture={picture} />
        <DetailsCard picture={picture} />
      </div>
      <AliasGrid alias={alias} />
      {aliasLoading && (
        <div className="flex justify-center">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default Details;
