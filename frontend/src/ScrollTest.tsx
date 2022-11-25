import React from "react";

const handleScroll = () => {
  console.log("Scroll event ocurred ...");
};

const ScrollTest = () => {
  return (
    <div
      className="w-full h-[10rem] whitespace-nowrap overflow-auto"
      onScroll={()=> handleScroll()}
    >
      <div className="flex flex-col text-3xl text-gray-200">
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
        <p>Some very long text test here ...</p>
      </div>
    </div>
  );
};

export default ScrollTest;
