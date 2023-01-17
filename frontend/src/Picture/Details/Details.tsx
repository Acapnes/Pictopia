import React, { Suspense } from "react";
import { SuspenseVeiw } from "../../components/Prettys/PrettyViews";

const DetailsPicture = React.lazy(() => import("./Card/DetailsBody"));
const DetailsAlias = React.lazy(() => import("./Card/DetailsAlias"));

const Details: React.FC<{}> = () => {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row pl-3 pr-1 pb-10">
      <Suspense fallback={<SuspenseVeiw />}>
        <DetailsPicture />
      </Suspense>

      <Suspense fallback={<SuspenseVeiw />}>
        <DetailsAlias />
      </Suspense>
    </div>
  );
};

export default Details;
