import React, { Suspense, useEffect, useState } from "react";
import { PicDto } from "../../Api/Pic/picDtos";
import { PicAPI } from "../../Api/Pic/PicApi";
import DetailsCard from "./Card/DetailsCard";
import { useParams } from "react-router-dom";
import { AliasGrid } from "../Grids/Grids";
import { usePicturePaginationStore } from "../../components/Zustand/store";
import { LoadingAnimation } from "../Grids/PictopiaGrid";

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
      setAliasLoading(true);
      setAlias(
        await PicAPI.getPicsAlias(params?.id, {
          currentPage: currentPage,
          postPerPage: postPerPage,
        })
      );
      setAliasLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!aliasLoading && currentPage > 0) {
        setAliasLoading(true);
        setAlias([
          ...alias,
          ...(await PicAPI.getPicsAlias(params?.id, {
            currentPage: currentPage,
            postPerPage: postPerPage,
          })),
        ]);
        setAliasLoading(false);
      }
    })();
  }, [currentPage]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
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
