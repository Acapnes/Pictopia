import { PrettyRainbow } from "../../../components/Prettys/PrettyComponents";

const ProfileSelections: React.FC<{}> = () => {
  return (
    <div className="h-full min-w-[15rem] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 pb-3">
      <a href="/profile/edit" className="rounded-sm">
        <PrettyProfileSelectionButton text={"Public Profile"} />
      </a>
      <a href="/profile/privacy" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Social"} />
      </a>
      <a href="/profile/management" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Management"} />
      </a>
      <a href="/profile/blocking" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Blocking"} />
      </a>
    </div>
  );
};

export default ProfileSelections;

const PrettyProfileSelectionButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <PrettyRainbow
      advStyle={`w-full min-w-[10rem] rounded-sm`}
      advChildStyle="w-full min-w-[10rem]"
    >
      <span className="text-white">{text}</span>
    </PrettyRainbow>
  );
};
