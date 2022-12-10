import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RouteGuard: React.FC<{}> = () => {
  const TokenController = () => {
    if (window?.localStorage?.getItem("access_token")) return true;
    return false;
  };

  return (
    <>
      <div>{TokenController() ? <Outlet /> : <Navigate to={"/login"} />}</div>
    </>
  );
};

export default RouteGuard;
