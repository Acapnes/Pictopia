import React, { Suspense } from "react";
import { SuspenseVeiw } from "../../components/Prettys/PrettyViews";
import Footer from "../../Menus/Footer";

const DetailsBody = React.lazy(() => import("./Body/DetailsBody"));

const MoreAlias = React.lazy(() => import("./Suggestions/MoreAlias"));
const MoreFromAuthor = React.lazy(() => import("./Suggestions/MoreFromAuthor"));
const MoreTrends = React.lazy(() => import("./Suggestions/MoreTrends"));

const Details: React.FC<{}> = () => {
  
  return (
    <>
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row pl-3 font-mono ">
        <Suspense fallback={<SuspenseVeiw />}>
          <DetailsBody />
        </Suspense>
        <div className="min-h-screen w-full lg:w-[35%] flex flex-col space-y-5 text-gray-200 px-5 pt-4 bg-extra-rough-soft-black">
          <Suspense fallback={<SuspenseVeiw />}>
            <MoreFromAuthor />
            <MoreAlias />
            <MoreTrends />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;
