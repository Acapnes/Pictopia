import { useEffect } from "react";

const ExtendedChangeProfile = (props: any) => {
  return (
    <div className="h-full w-full space-y-4">
      <div className={``}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          <div>
            <p className="w-full text-center font-semibold">Change Password</p>
          </div>
          <div>
            <p className="w-full text-center font-semibold">Change Email</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedChangeProfile;
