import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Details from "./Details/Details";
import Profile from "./User/Moderation/Profile";
import Login from "./User/Auth/Login";
import Register from "./User/Auth/Register";
import PostPic from "./Pics/PostPic";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/detail/*" element={<Details />} />
        <Route path="/user/*" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<PostPic />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
