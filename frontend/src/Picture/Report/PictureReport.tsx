import React from "react";
import { PrettyRainbowDiv } from "../../components/Prettys/PrettyComponents";
import Header from "../../Menus/Header";

const PictureReport: React.FC<{}> = () => {
  return (
    <div className="min-w-screen min-h-screen bg-soft-black">
      <div className="flex flex-col space-y-5 items-center">
        <Header />
        <PrettyRainbowDiv>
          <p>deneme</p>
        </PrettyRainbowDiv>
      </div>
    </div>
  );
};

export default PictureReport;
