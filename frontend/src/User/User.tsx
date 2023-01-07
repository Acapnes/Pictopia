import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { AccountAPI } from "../Api/User/AccountApi";
import { Notfound } from "../components/Prettys/PrettyViews";
import { UserDto } from "../Api/User/UserDtos/userDto";
import Header from "../Menus/Header";
import Visit from "./Visit/Visit";

const SavedPictures = React.lazy(
  () => import("./Visit/VisitMenus/SavedPictures")
);
const PostedComments = React.lazy(
  () => import("./Visit/VisitMenus/PostedComments")
);
const PostedPictures = React.lazy(
  () => import("./Visit/VisitMenus/PostedPictures")
);

const User: React.FC<{}> = () => {
  const [userVisitCredentials, setUserVisitCredentials] = useState<UserDto>();
  const params = useParams() as any;

  const setUserCredentials = async () => {
    setUserVisitCredentials(await AccountAPI.VisitProfileFetchUser(params.id));
  };

  useEffect(() => {
    setUserCredentials();
  }, []);

  return (
    // h-[10rem]
    <div className="min-h-screen h-full flex flex-col bg-soft-black">
      <Routes>
        <Route element={<Visit />}>
          <Route
            index
            element={
              <SavedPictures user={userVisitCredentials!} params={params} />
            }
          />
          <Route
            path="posted"
            element={
              <PostedPictures user={userVisitCredentials!} params={params} />
            }
          />
          <Route
            path="comments"
            element={
              <PostedComments user={userVisitCredentials!} params={params} />
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
    </div>
  );
};

export default User;
