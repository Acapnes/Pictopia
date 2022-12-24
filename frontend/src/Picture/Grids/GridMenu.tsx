import { PicDto } from "../../Api/Pic/dtos/picDto";

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
              <div className="w-[3rem] h-full flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full">
                <img
                  src={`data:${picture?.authorPic?.avatar?.contentType};base64,${picture?.authorPic?.avatar?.data}`}
                  alt=""
                  className="rounded-full w-full h-full p-0.5"
                />
              </div>
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
