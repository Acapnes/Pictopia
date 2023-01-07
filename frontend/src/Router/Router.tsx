import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteGuard } from "../components/Prettys/PrettyHelpers";
import { Notfound, SuspenseVeiw } from "../components/Prettys/PrettyViews";
import Header from "../Menus/Header";
import SearchView from "../Menus/Mobile/SearchView";
import Pictopia from "../Pictopia";
import Details from "../Picture/Details/Details";
import PictureEdit from "../Picture/Management/PictureEdit";
import PictureReport from "../Picture/Management/PictureReport";
import UploadPic from "../Picture/Upload/UploadPic";
import Login from "../User/Auth/Login";
import Register from "../User/Auth/Register";
import AccountUsageEdit from "../User/Moderation/Mobile/AccountUsageEdit";
import Profile from "../User/Moderation/Profile";
import User from "../User/User";

const Router: React.FC<{}> = () => {
  return (
    <Suspense fallback={<SuspenseVeiw />}>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Header />}>
          <Route path="/" element={<Pictopia />} />
          <Route path="/explore" element={<Pictopia />} />

          <Route path="/category/:category" element={<Pictopia />} />
          <Route path="/search/:input" element={<Pictopia />} />
          <Route path="/search/tags/:tag" element={<Pictopia />} />
          <Route path="/detail/:id" element={<Details />} />

          <Route path="/search" element={<SearchView />} />
          <Route path="/report" element={<PictureReport />} />

          <Route path="/user/:id/*" element={<User />} />

          {/* AuthGuard */}
          <Route element={<RouteGuard />}>
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/upload" element={<UploadPic />} />
            <Route path="/edit/picture/:id" element={<PictureEdit />} />
            <Route path="/edit/usage/" element={<AccountUsageEdit />} />
          </Route>
        </Route>

        {/* Exception Handler Veiw */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
