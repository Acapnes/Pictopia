import { PrettyAlertIcon } from "../Prettys/PrettyIcons";

const HeaderCategoryAlert = (props: any) => {
  return (
    <div className="w-full py-2">
      <div className="px-5 py-2.5 bg-pretty-rough-pink bg-opacity-70 w-full flex flex-row justify-between space-x-2 items-center shadow-xl">
        <PrettyAlertIcon size={20} />
        <p className="w-full text-gray-200 text-center text-sm">
          {props?.alert?.message}
        </p>
      </div>
    </div>
  );
};

export { HeaderCategoryAlert };
