import { PrettySearchIcon } from "../../components/Prettys/PrettyIcons";

const SearchDefaultSuggests: React.FC<{
  searchInput: string;
}> = ({ searchInput }) => {
  return (
    <>
      {searchInput && (
        <div className="flex-auto flex flex-col space-y-2 text-gray-200">
          <a
            href={`/search/${searchInput}`}
            className="flex flex-row space-x-1.5 py-1.5 bg-light-soft-black px-2 rounded-md items-center"
          >
            <PrettySearchIcon size={14} />
            <span className="">
              Search in pictures
              <span className="font-bold pl-1">{searchInput}</span>
            </span>
          </a>
          <a
            href={`/search/tags/${searchInput}`}
            className="flex flex-row space-x-1.5 py-1.5 bg-light-soft-black px-2 rounded-md items-center"
          >
            <PrettySearchIcon size={14} />
            <span className="">
              Search in hashtags
              <span className="font-bold pl-1">#{searchInput}</span>
            </span>
          </a>
        </div>
      )}
    </>
  );
};

export { SearchDefaultSuggests };
