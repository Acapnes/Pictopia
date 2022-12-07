import React from "react";
import { Outlet } from "react-router-dom";

const Common: React.FC<{}> = () => {
  return (
    <div className="min-h-screen min-w-screen w-full h-full bg-soft-black">
      <p className="text-white text-4xl">deneme</p>
      <Outlet />
    </div>
  );
};

export default Common;
