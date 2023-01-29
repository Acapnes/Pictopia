import React, { Suspense, useEffect, useState } from "react";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { AccountAPI } from "../Api/User/AccountApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import RouteGuard from "./RouteGuard";
import { Notfound, SuspenseVeiw } from "../components/Prettys/PrettyViews";
import Header from "../Menus/Header";
import Pictopia from "../Pictopia";
import Pictures from "../Picture/Fullscreen/Pictures";
import PictureEdit from "../Picture/Management/PictureEdit";
import PictureReport from "../Picture/Management/PictureReport";
import UploadPic from "../Picture/Upload/UploadPic";
import Login from "../User/Auth/Login";
import Register from "../User/Auth/Register";
import Profile from "../User/Moderation/Profile";
import User from "../User/User";
import Home from "../User/UserMenus/Home";
import PostedPictures from "../User/UserMenus/PostedPictures";
import SavedPictures from "../User/UserMenus/SavedPictures";
import Details from "../Details/Details";

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

const UserRouter: React.FC<{}> = () => {
  const [userVisitCredentials, setUserVisitCredentials] = useState<UserDto>();
  const params = useParams() as any;

  const setUserCredentials = async () => {};

  useEffect(() => {
    (async () => {
      setUserVisitCredentials(
        await AccountAPI.VisitProfileFetchUser(params.id)
      );
    })();
    setUserCredentials();
  }, []);

  return (
    <Suspense fallback={<SuspenseVeiw />}>
      <Routes>
        <Route element={<User user={userVisitCredentials!} />}>
          <Route index element={<Home user={userVisitCredentials!} />} />
          <Route
            path="posted"
            element={
              <PostedPictures user={userVisitCredentials!} params={params} />
            }
          />
          <Route
            path="comments"
            element={
              <PostedPictures user={userVisitCredentials!} params={params} />
            }
          />
          <Route
            path="followers"
            element={
              <SavedPictures user={userVisitCredentials!} params={params} />
            }
          />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
