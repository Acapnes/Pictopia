import { PicDto } from "../../Api/Pic/dtos/picDto";
import { PrettyCustomSizeAvatar } from "../../components/Prettys/PrettyElements";

const GridMenu: React.FC<{ picture: PicDto }> = ({ picture }) => {
  return (
    <a href={`/detail/${picture?._id}`}>
      <div
        className="absolute bottom-0 w-full h-full transition duration-500 ease-in-out border-[2.5px]
       border-pretty-rough-pink border-opacity-95 bg-gradient-to-t from-light-soft-black to-transparent text-white opacity-0 bg-opacity-0 group-hover:bg-opacity-50
        group-hover:opacity-90 group-hover:shadow-lg rounded-sm"
      >
        <div className="w-full h-full flex flex-col">
          <div className="absolute bottom-0 w-full h-fit flex flex-col py-2 px-4 space-y-1">
            <div className="flex flex-col space-y-[0.35rem] w-fit h-fit ">
              <PrettyCustomSizeAvatar
                avatar={{
                  data: picture?.authorPic?.avatar?.data,
                  contentType: picture?.authorPic?.avatar?.contentType,
                }}
                size={2.75}
              />
            </div>
            <div className="w-full">
              <p className="truncate break-all font-bold text-white">
                {picture?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GridMenu;
