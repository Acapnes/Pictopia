// import Grid from "./Picture/Grids/Grid";
import Header from "./Menus/Header";
import React, { Suspense, useState } from "react";
import SuspenseVeiw from "./components/Views/SuspenseVeiw";
const PictopiaGrid = React.lazy(() => import("./Picture/Grids/PictopiaGrid"));

const Pictopia: React.FC<{}> = ({}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [postPerPage, setPostPerPage] = useState<number>(20);

  const handleScroll = (e: any) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 10
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="min-h-screen h-[10rem] flex flex-col space-y-3 bg-soft-black overflow-auto"
    >
      <Header />
      <Suspense fallback={<SuspenseVeiw />}>
        <PictopiaGrid currentPage={currentPage} postPerPage={postPerPage} />
      </Suspense>
    </div>
  );
};

export default Pictopia;
