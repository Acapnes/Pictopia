import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Pictopia";
import Details from "./Picture/Details/Details";
import Login from "./User/Auth/Login";
import Register from "./User/Auth/Register";
import UploadPic from "./Picture/Upload/UploadPic";
import User from "./User/Visit/User";
import Profile from "./User/Moderation/Profile";
import ProfileEdit from "./User/Moderation/ProfileMenus/Edit/ProfileEdit";
import Test from "./Test";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/explore" element={<App />} />
        <Route path="/detail/*" element={<Details />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPic />} />
        <Route path="/test" element={<Test />} />

        <Route path="/profile/edit" element={<Profile />} />
        <Route path="/profile/privacy" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
