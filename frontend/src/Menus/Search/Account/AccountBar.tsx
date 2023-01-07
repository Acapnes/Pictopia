import {
  PrettyHelpIcon,
  PrettyPenIcon,
} from "../../../components/Prettys/PrettyIcons";
import { usePictopiaPublicAccountStore } from "../../../components/Zustand/store";

const LastSearchs: React.FC<{}> = () => {
  const lastSearches = usePictopiaPublicAccountStore<string[]>(
    (state: any) => state.lastSearches
  );

  return (
    <>
      {lastSearches?.length > 0 && (
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row space-x-1 items-center">
            <PrettyHelpIcon />
            <p className="text-gray-200 font-bold">Recently Searched</p>
            <a href="/edit/usage" className="pl-1">
              <PrettyPenIcon size={12} fill="rgb(244,114,182)" />
            </a>
          </div>
          <div className="w-full flex flex-wrap items-center h-fit px-1 pb-0.5 border-b-2 border-pretty-pink max-h-[7.5rem] overflow-y-auto scrollbar-hide">
            {lastSearches?.map((search: string, searchIndex: number) => (
              <div
                key={searchIndex}
                className="bg-slate-800 rounded-sm mr-1.5 mb-1 hover:bg-pretty-pink bg-opacity-100 hover:bg-opacity-90 text-pretty-pink hover:text-gray-100 font-semibold text-sm text-center duration-300"
              >
                <div className="flex flex-row space-x-2 px-1.5 py-1">
                  <a
                    href={
                      search[0] === "#"
                        ? `/search/tags/${search.slice(1, search.length)}`
                        : `/search/${search}`
                    }
                  >
                    <div className="">
                      <span>{search}</span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export { LastSearchs };
