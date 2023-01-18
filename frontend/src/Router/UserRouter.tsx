import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { AccountAPI } from "../Api/User/AccountApi";
import { UserDto } from "../Api/User/UserDtos/userDto";
import { Notfound, SuspenseVeiw } from "../components/Prettys/PrettyViews";
import Home from "../User/UserMenus/Home";

const SavedPictures = React.lazy(
  () => import("../User/UserMenus/SavedPictures")
);
const PostedPictures = React.lazy(
  () => import("../User/UserMenus/PostedPictures")
);
const PostedComments = React.lazy(
  () => import("../User/UserMenus/PostedComments")
);
const User = React.lazy(() => import("../User/User"));

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
    </Suspense>
  );
};

export default UserRouter;
