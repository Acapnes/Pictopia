import { PrettyAlertIcon } from "./PrettyIcons";

const CustomAlert = (props: any) => {
  return (
    <div className={`${props.result.message ? "block" : "hidden"} bg-gray-800 py-3 px-4`}>
      <div className="w-full h-full text-white flex flex-row space-x-2 break-all">
        <PrettyAlertIcon size={26} />
        <p className={`w-full h-full text-center space-x-2 font-semibold ${props?.result?.access | props?.result?.success ? "text-green-400":"text-red-400"}`}>
          {props.result.message}
        </p>
      </div>
    </div>
  );
};

export default CustomAlert;
