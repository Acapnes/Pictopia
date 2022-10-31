import { useState } from "react";
import {
  PrettySearchMenuButton,
  PrettyXButton,
} from "../../components/PrettyButtons";
import SearchMenuPicsGrid from "../../Grids/SearchMenuPicsGrid";
import SearchMenuUsersGrid from "../../Grids/SearchMenuUsersGrid";

const SearchMenu = () => {
  const [menuHandler, setMenuHandler] = useState<Number>(0);

  return (
    <div className="w-full h-full">
      <div className="w-full h-fit p-0.5 inline-flex items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]">
        <div className=" w-full px-4 pt-2 pb-4 bg-soft-black bg-opacity-95 rounded-sm relative">
          <div className="flex flex-col space-y-2">
            <div className="w-full flex flex-row justify-around pt-1 pb-2.5 border-b-2 border-pretty-pink">
              <button onClick={() => setMenuHandler(0)} className="rounded-sm">
                <PrettySearchMenuButton text={"Pictures"} />
              </button>
              <button onClick={() => setMenuHandler(1)} className="rounded-sm">
                <PrettySearchMenuButton text={"Pictopia Users"} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
              {menuHandler === 0 && <SearchMenuPicsGrid />}
              {menuHandler === 1 && <SearchMenuUsersGrid />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
