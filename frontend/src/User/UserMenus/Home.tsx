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
    <div className="w-full flex flex-col space-y-5">
      <div className="flex flex-row space-x-3 overflow-x-auto whitespace-nowrap">
        {postedPictures?.map((picture: PicDto, pictureIndex: number) => (
          <img
            key={pictureIndex}
            src={`data:${picture.picture_file.contentType};base64,${picture.picture_file.data}`}
            alt=""
            className="h-[12rem] object-cover"
          />
        ))}
      </div>
      <div className="flex flex-row space-x-5 justify-between text-gray-200">
        <div className="w-full flex flex-col space-y-5">
          <div className="w-full h-36 bg-yellow-400"></div>
          <div className="w-full h-36 bg-green-400"></div>
          <div className="w-full h-36 bg-red-400"></div>
          <div className="w-full h-36 bg-blue-400"></div>
          <div className="w-full h-36 bg-pink-400"></div>
          <div className="w-full h-36 bg-purple-400"></div>
        </div>
        <div className="h-fit min-w-[33.3%] flex flex-col bg-black p-4">
          <p>asd</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
