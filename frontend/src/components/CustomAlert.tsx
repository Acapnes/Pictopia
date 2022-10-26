import { useEffect } from "react";
import { PrettyAlertIcon } from "./PrettyIcons";

const CustomAlert = (props: any) => {

  useEffect(() => {
    setTimeout(()=>{
      console.log(props?.result?.message)
    },2000)
  }, []);


  return (
    <div className="">
      <div
        className={`${props.result.message ? "block" : "hidden"} ${
          props.background === true && "bg-gray-800"
        } py-4 px-4`}
      >
        <div className="w-full h-full text-white flex flex-row space-x-2 break-all">
          <PrettyAlertIcon size={26} />
          <p
            className={`w-full h-full text-center space-x-2 font-semibold ${
              props?.result?.access | props?.result?.success
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {props.result.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
