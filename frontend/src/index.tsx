import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Details from "./Details/Details";
import Profile from "./User/Profile";

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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
