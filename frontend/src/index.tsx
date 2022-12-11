import React, { Suspense } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pictopia from "./Pictopia";
import Details from "./Picture/Details/Details";
import Login from "./User/Auth/Login";
import Register from "./User/Auth/Register";
import UploadPic from "./Picture/Upload/UploadPic";
import User from "./User/User";
import Profile from "./User/Moderation/Profile";
import SuspenseVeiw from "./components/Views/SuspenseVeiw";
import CustomToast from "./components/Views/CustomToast";
import RouteGuard from "./components/Helpers/RouteGuard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Suspense fallback={<SuspenseVeiw />}>
      <CustomToast />
      <Routes>
        <Route path="*" element={<Pictopia />} />
        <Route path="/category/:category" element={<Pictopia />} />
        <Route path="/search/:input" element={<Pictopia />} />
        <Route path="/search/tags/:tag" element={<Pictopia />} />
        <Route path="/detail/:id" element={<Details />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user/:id/*" element={<User />} />

        {/* AuthGuard */}
        <Route element={<RouteGuard />}>
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/upload" element={<UploadPic />} />
        </Route>

        {/* AuthGuard */}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

{
  /* <React.StrictMode>

</React.StrictMode> */
}
