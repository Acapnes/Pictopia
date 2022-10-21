import { Link } from "react-router-dom";
import { PicDto } from "../../Api/PicDtos/picDto";

const GridMenu = (props: PicDto | any) => {
  return (
    <Link to={`/detail/${props.pic._id}`} state={props.pic}>
      <div className="absolute bottom-0 w-full h-full transition-all duration-300 ease-in-out bg-soft-black text-white opacity-0 bg-opacity-0 group-hover:bg-opacity-70 group-hover:opacity-90">
        <div className="w-full h-full flex flex-col">
          <div className="absolute bottom-0 w-full h-fit flex flex-col p-5 space-y-2">
            <div className="flex flex-col space-y-[0.35rem] w-fit h-fit">
              <div className="w-[3rem] h-full flex bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] rounded-full">
                <img
                  src={`data:${props.pic.authorPic.avatar.contentType};base64,${props.pic.authorPic.avatar.data}`}
                  alt=""
                  className="rounded-full w-full h-full p-[0.12rem]"
                />
              </div>
            </div>

            <div className="w-full ml-[0.15rem]">
              <p className="truncate break-all font-bold text-white">
                {props.pic.title}
              </p>
            </div>
          </div>

          <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 ">
            <button
              className="inline-flex h-fit w-fit items-center justify-center p-3 text-xl font-semibold text-center text-gray-200 no-underline align-middle
           transition-all duration-500 ease-in-out bg-transparent border-2 bg-gray-700 bg-opacity-0 hover:bg-opacity-75 border-gray-600 border-solid rounded-full
           hover:border-white focus:shadow-xs focus:no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bookmarks-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" />
                <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
              </svg>
            </button>
            <button
              className="inline-flex h-fit w-fit items-center justify-center p-3 text-xl font-semibold text-center text-gray-200 no-underline align-middle
           transition-all duration-500 ease-in-out bg-transparent border-2 bg-gray-700 bg-opacity-0 hover:bg-opacity-75 border-gray-600 border-solid rounded-full
           hover:border-white focus:shadow-xs focus:no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-share-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
              </svg>
            </button>
            <div className="relative"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GridMenu;