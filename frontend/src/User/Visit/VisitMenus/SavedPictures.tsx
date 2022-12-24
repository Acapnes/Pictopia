import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { PicDto } from "../../../Api/Pic/dtos/picDto";
import { AccountAPI } from "../../../Api/User/AccountApi";
import { UserDto } from "../../../Api/User/UserDtos/userDto";
import { ReturnFuncDto } from "../../../Api/Utils/ReturnFuncDto";
import { PrettyLockIcon } from "../../../components/Prettys/PrettyIcons";
import GridMenu from "../../../Picture/Grids/GridMenu";

const SavedPictures: React.FC<{ user: UserDto; params: any }> = ({
  user,
  params,
}) => {
  const [SavedPictures, setSavedPictures] = useState<PicDto[]>([]);
  const [functionResult, setFunctionResult] = useState<string>();

  useEffect(() => {
    (async () => {
      await AccountAPI.getSavedPicturesOfUser(params.id).then(
        (result: PicDto[] & ReturnFuncDto) => {
          if (result?.success === false) {
            const funcResult = result as ReturnFuncDto;
            setFunctionResult(funcResult.message);
          } else {
            const picturesArray = result as PicDto[];
            setSavedPictures(picturesArray);
          }
        }
      );
    })();
  }, []);

  return (
    <div className="min-h-screen">
      {SavedPictures.length > 0 && (
        <div className="flex flex-col items-center bg-soft-black bg-opacity-95 px-4 pb-4">
          <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
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
                <GridMenu picture={pic} />
              </div>
            ))}
          </Masonry>
        </div>
      )}
      {functionResult && (
        <div className="w-full flex flex-col space-y-2 items-center justify-center mt-10">
          <PrettyLockIcon fill="white" size={30} />
          <p className="text-gray-200 font-bold text-3xl">PRIVATE ACCOUNT</p>
        </div>
      )}
    </div>
  );
};

export default SavedPictures;
