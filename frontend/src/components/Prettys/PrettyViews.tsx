import { Navigate } from "react-router-dom";
import { useAlertStore } from "../Zustand";
import { PrettyAlertIcon, PrettyBugIcon } from "./PrettyIcons";

const CustomToast: React.FC<{}> = () => {
  const toastState = useAlertStore((state: any) => state.toastState);
  const toastMassage = useAlertStore((state: any) => state.toastMassage);
  return (
    <>
      {toastState && (
        <div
          className={`max-w-[90vw] min-w-[15rem] overflow-y-auto fixed top-[7.5rem] left-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-3.5
           bg-slate-800 bg-opacity-90 z-50 duration-700 fade-out `}
        >
          <div className="flex flex-row space-x-3 items-center">
            <div className="min-w-[1.25rem] w-fit">
              <PrettyAlertIcon size={20} fill={"rgb(244, 114, 182)"} />
            </div>
            <div className="w-full text-center">
              <p className="font-bold text-gray-200 break-all">
                {toastMassage}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Notfound: React.FC<{ navigatePath?: string }> = ({ navigatePath }) => {
  return (
    <div className="min-h-screen min-w-screen w-full h-full bg-soft-black">
      <div className="flex-auto flex-col h-full w-full items-center pt-10">
        <div className="w-full">
          <p className="text-[8rem] md:text-[10rem] 3xl:text-[12rem] text-gray-200 text-center">
            404
          </p>
        </div>
        <div className="w-full h-full flex flex-row space-x-5 items-center justify-center">
          <PrettyBugIcon size={40} fill={"#f472b6"} />
          <div className="flex flex-col text-center">
            <p className="text-xl md:text-2xl 3xl:text-3xl text-gray-200">
              Something went wrong
            </p>
            <p className="text-xl md:text-2xl 3xl:text-3xl text-gray-200">
              Please try again later
            </p>
          </div>
        </div>
      </div>
      {navigatePath && <Navigate to={navigatePath} />}
    </div>
  );
};

const SuspenseVeiw: React.FC<{ text?: string; main?: boolean }> = ({
  text,
  main,
}) => {
  return (
    <div
      className={`w-full flex-auto flex justify-center ${
        main && "min-h-screen"
      }`}
    >
      <div className="flex flex-col space-y-3 h-fit w-fit items-center mt-10">
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="w-full h-full flex flex-col items-center">
          {text && (
            <p className="text-xl md:text-2xl 3xl:text-3xl text-gray-200">
              {text}
            </p>
          )}
          <p className="text-lg md:text-xl 3xl:text-2xl text-gray-200">
            Loading Please Wait...
          </p>
        </div>
      </div>
    </div>
  );
};

export { CustomToast, Notfound, SuspenseVeiw };
