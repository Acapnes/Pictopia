import React, { useEffect, useState } from "react";
import { PicDto } from "../../../Api/Pic/dtos/picDto";
import { AccountAPI } from "../../../Api/User/AccountApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";

const SavedPictures: React.FC<{ user: UserDto }> = ({ user }) => {
  const [SavedPictures, setSavedPictures] = useState<PicDto[]>([]);

  const getSavedPictures = async () => {
    setSavedPictures(await AccountAPI.getSavedPicturesOfUser(user?.username));
  };
  useEffect(() => {
    getSavedPictures();
  }, []);

  return (
    <div>
      {SavedPictures.length > 0 && (
        <div className="flex flex-col space-y-5 bg-soft-black bg-opacity-95">
          <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:colmuns-6 gap-4 z-0 w-fit space-y-4 ">
            {SavedPictures.map((pic: PicDto, picIndex: number) => (
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
      )}
    </div>
  );
};

export default SavedPictures;
