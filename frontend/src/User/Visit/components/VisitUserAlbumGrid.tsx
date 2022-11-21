import React, { useEffect, useState } from "react";
import { PicDto } from "../../../Api/Pic/PicDtos/picDto";
import { UserAPI } from "../../../Api/User/UserApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";

const VisitUserAlbumGrid: React.FC<{ user: UserDto }> = ({ user }) => {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await UserAPI.getSavedPicturesOfUser(user?.username));
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div className="flex justify-center bg-soft-black bg-opacity-95">
      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:colmuns-6 gap-4 z-0 w-fit space-y-4 ">
        {respPics.map((pic, picIndex) => (
          <div
            className="group relative h-fit w-full flex flex-col justify-center items-center-4 "
            key={picIndex}
          >
            <img
              src={`data:${pic.picture_file.contentType};base64,${pic.picture_file.data}`}
              alt=""
              className="min-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitUserAlbumGrid;