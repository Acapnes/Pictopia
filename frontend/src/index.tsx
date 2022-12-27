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
import PictureEdit from "./Picture/Management/Edit/PictureEdit";
import PictureReport from "./Picture/Management/Report/PictureReport";
import SearchView from "./Menus/Mobile/SearchView";
import AccountUsageEdit from "./Picture/Management/Edit/AccountUsageEdit";
import { CustomToast, Notfound, SuspenseVeiw } from "./components/Prettys/PrettyViews";
import { RouteGuard } from "./components/Prettys/PrettyHelpers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Suspense fallback={<SuspenseVeiw />}>
      <CustomToast />
      <Routes>
        <Route path="/" element={<Pictopia />} />
        <Route path="/explore" element={<Pictopia />} />

        <Route path="/category/:category" element={<Pictopia />} />
        <Route path="/search/:input" element={<Pictopia />} />
        <Route path="/search/tags/:tag" element={<Pictopia />} />
        <Route path="/detail/:id" element={<Details />} />

        <Route path="/search" element={<SearchView />} />
        <Route path="/report" element={<PictureReport />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id/*" element={<User />} />

        {/* AuthGuard */}
        <Route element={<RouteGuard />}>
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/upload" element={<UploadPic />} />
          <Route path="/edit/picture/:id" element={<PictureEdit />} />
          <Route path="/edit/usage/" element={<AccountUsageEdit />} />
        </Route>
        {/* AuthGuard */}

        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

{
  /* <React.StrictMode>

</React.StrictMode> */
}
