import Grid from "./Picture/Grids/Grid";
import Header from "./Menus/Header";
import React, { useState } from "react";

const Pictopia: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(20);

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="min-h-screen h-[10rem] flex flex-col space-y-3 bg-soft-black overflow-auto"
    >
      <Header />
      <Grid currentPage={currentPage} postPerPage={postPerPage} />
    </div>
  );
};

export default Pictopia;
