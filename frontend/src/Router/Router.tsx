import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import RouteGuard from "../components/Helpers/RouteGuard";
import { Notfound, SuspenseVeiw } from "../components/Prettys/PrettyViews";
import Header from "../Menus/Header";
import Pictopia from "../Pictopia";
import Details from "../Picture/Details/Details";
import Pictures from "../Picture/Fullscreen/Pictures";
import PictureEdit from "../Picture/Management/PictureEdit";
import PictureReport from "../Picture/Management/PictureReport";
import UploadPic from "../Picture/Upload/UploadPic";
import Login from "../User/Auth/Login";
import Register from "../User/Auth/Register";
import Profile from "../User/Moderation/Profile";
import UserRouter from "./UserRouter";

const Router: React.FC<{}> = () => {
  return (
    <Suspense fallback={<SuspenseVeiw main />}>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Pictopia />} />
        <Route path="/explore" element={<Pictopia />} />
        <Route path="/category/:category" element={<Pictopia />} />
        <Route path="/search/:input" element={<Pictopia />} />
        <Route path="/search/tags/:tag" element={<Pictopia />} />

        <Route path="/pictures/:id" element={<Pictures />} />

        <Route
          element={
            <div className="min-h-screen bg-rough-soft-black">
              <Header />
              <Outlet />
            </div>
          }
        >
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/report" element={<PictureReport />} />
          <Route path="/user/:id/*" element={<UserRouter />} />
          <Route path="/upload" element={<UploadPic />} />

          {/* AuthGuard */}
          <Route element={<RouteGuard />}>
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/edit/picture/:id" element={<PictureEdit />} />
          </Route>
        </Route>

        {/* Exception Handler Veiw */}
        <Route path="*" element={<Notfound />} />
        <Route path="/error" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
