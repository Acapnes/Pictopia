import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PicDto } from "../../Api/Pic/picDtos";
import { AccountAPI } from "../../Api/User/AccountApi";
import { UserDto } from "../../Api/User/UserDtos/userDto";

const Home: React.FC<{ user: UserDto }> = ({ user }) => {
  const [postedPictures, setPostedPictures] = useState<PicDto[]>([]);

  const params = useParams() as any;

  useEffect(() => {
    (async () => {
      setPostedPictures(await AccountAPI.GetUsersPostedPictures(params.id));
    })();
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col space-y-5">
        <p className="text-xl font-bold text-gray-200">Portfolio</p>
        <div className="flex flex-row overflow-x-auto">
          {postedPictures?.map((picture: PicDto, pictureIndex: number) => (
            <div
              className="group relative w-full flex flex-col justify-center items-center max-h-[5rem] "
              key={pictureIndex}
            >
              <img
                src={`data:${picture.picture_file.contentType};base64,${picture.picture_file.data}`}
                alt=""
                className="min-w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
