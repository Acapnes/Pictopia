import { PrettyProfileSelectionButton } from "../../../components/Prettys/PrettyButtons";

const ProfileSelections = (props: any) => {
  return (
    <div className="h-full min-w-[15rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-3">
      <a href="/profile/edit" className="rounded-sm">
        <PrettyProfileSelectionButton text={"Public Profile"} />
      </a>
      <a href="/profile/privacy" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Social"} />
      </a>
      <a href="/profile/password" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Password"} />
      </a>
      <a href="/profile/user_blocks" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Blocking"} />
      </a>
      <a href="/profile/user_blocks" className="rounded-lg">
        <PrettyProfileSelectionButton text={"Management"} />
      </a>
    </div>
  );
};

export default ProfileSelections;
