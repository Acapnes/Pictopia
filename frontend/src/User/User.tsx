import Header from "../Menus/Header";
import { Route, Routes, useParams } from "react-router-dom";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { useEffect, useState } from "react";
import Visit from "./Visit/Visit";
import PostedPictures from "./Visit/VisitMenus/PostedPictures";
import { AccountAPI } from "../Api/User/AccountApi";
import React from "react";
import { Notfound } from "../components/Prettys/PrettyViews";

const SavedPictures = React.lazy(
  () => import("./Visit/VisitMenus/SavedPictures")
);
const PostedComments = React.lazy(
  () => import("./Visit/VisitMenus/PostedComments")
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
      <Header />
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
