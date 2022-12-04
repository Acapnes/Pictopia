import React, { Suspense } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pictopia from "./Pictopia";
import Details from "./Picture/Details/Details";
import Login from "./User/Auth/Login";
import Register from "./User/Auth/Register";
import UploadPic from "./Picture/Upload/UploadPic";
import User from "./User/Visit/User";
import Profile from "./User/Moderation/Profile";
import SuspenseVeiw from "./components/Views/SuspenseVeiw";
import CustomToast from "./components/Views/CustomToast";
import AccountDeletion from "./User/Moderation/ProfileMenus/Management/components/AccountDeletion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SuspenseVeiw />}>
        <CustomToast />
        <Routes>
          <Route path="*" element={<Pictopia />} />
          <Route path="/categories/*" element={<Pictopia />} />

          <Route path="/detail/*" element={<Details />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadPic />} />

          <Route path="/profile/edit" element={<Profile />} />
          <Route path="/profile/privacy" element={<Profile />} />
          <Route path="/profile/management" element={<Profile />} />
          <Route path="/profile/blocking" element={<Profile />} />
          <Route path="/profile/deletion" element={<AccountDeletion />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
