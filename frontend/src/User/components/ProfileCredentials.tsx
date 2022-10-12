import { useState } from "react";
import {
  PrettyChangeProfileAvatar,
  PrettySaveChanges,
} from "../../components/PrettyButtons";
import ExtendedChangeProfile from "./ExtendedChangeProfile";

const ProfileCredentials = () => {
  const [showExtendedMenu, setShowExtendedMenu] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 ">
      <div className="flex justify-center items-center h-fit lg:sticky lg:top-10 relative">
        <div className="bg-[#fafafa] rounded-full shadow-lg p-[0.8rem] relative">
          <img
            src="https://avatars.githubusercontent.com/u/61701011?s=400&u=ff0ce423a1a9bb0998c60952e706e0976a8489fd&v=4"
            alt=""
            className="object-contain rounded-full max-h-[30rem]"
          />
        </div>
      </div>
      <div className="w-full lg:col-span-3 shadow-lg bg-[#fafafa] rounded-sm px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10 mb-20 ">
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">Email</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              value="alper1@gmail.com"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">Username</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder="Acapnes"
            />
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">Name</p>
            </div>
            <input
              type="text"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder="Alper"
            />
          </div>
          <div className="space-y-2">
            <div className="text-center flex items-center">
              <p className="font-semibold">BirthDate</p>
            </div>
            <input
              type="date"
              className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
              placeholder="alper1@gmail.com"
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:cols-span-4 xl:col-span-4 2xl:col-span-4 space-y-2 h-full">
            <div className="text-center flex items-center">
              <p className="font-semibold">Bio</p>
            </div>
            <textarea
              className="w-full h-full break-words px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800 resize-none"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent luctus neque vitae massa faucibus tempus. Sed non urna enim. Suspendisse efficitur lobortis dolor, egestas faucibus nulla porta a. Sed aliquet semper elementum. Donec sollicitudin pharetra mauris, vel laoreet urna hendrerit at. Aenean non elit dolor. Nulla facilisi. Donec hendrerit tellus enim, ac iaculis elit malesuada id. Quisque dignissim sapien dui, eu porta magna aliquam sed. In ipsum justo, convallis vel sapien id, condimentum pulvinar sem. Fusce quis imperdiet turpis. Nam at mollis ante.Praesent vestibulum malesuada risus non elementum. Integer convallis convallis quam nec sagittis. Nam eu semper ante. Nunc consectetur, justo ut vulputate volutpat, justo diam vulputate metus, id vehicula dui nisl et justo. Ut tincidunt sem sit amet turpis pellentesque dapibus. Vestibulum id nisl arcu. Integer quam felis, lobortis sed sem luctus, sagittis elementum risus. Praesent cursus rutrum arcu, id dignissim enim consequat ac. Phasellus interdum lobortis accumsan. Nunc a cursus odio. Praesent malesuada purus at fringilla luctus. Suspendisse dignissim semper varius. Cras hendrerit euismod nunc, in luctus libero consectetur a. Aliquam erat volutpat.
            Proin lobortis diam at tincidunt vestibulum. Nulla elementum laoreet mauris, at pharetra neque eleifend eu. Suspendisse imperdiet ultricies est sit amet pretium. Phasellus viverra orci justo, nec sagittis turpis dignissim sed. In hac habitasse platea dictumst. Curabitur eu viverra tortor. Sed tincidunt sed ex ut tristique. Suspendisse euismod dui a tellus commodo, a molestie odio blandit. Duis vitae sagittis ex. Morbi sapien nulla, convallis molestie quam mollis, placerat sollicitudin libero.Pellentesque mattis tempus lacus non molestie. Sed a porttitor risus. Nullam aliquam lectus a sodales rhoncus. Proin scelerisque nibh et sem pulvinar, ac semper mi tincidunt. Duis quis ligula posuere, tincidunt orci ut, bibendum mi. Fusce dignissim, erat id tempor posuere, risus sem porta purus, id cursus felis nisl sed dolor. Vestibulum at lobortis metus. Morbi rutrum ullamcorper lobortis. Mauris sollicitudin euismod mattis. Nunc scelerisque dignissim libero, nec facilisis sapien. Sed sagittis egestas arcu, molestie pretium ex fringilla vitae. Duis aliquam, eros vitae mollis congue, est nibh lobortis nunc, eget aliquet eros risus a odio. Fusce tincidunt, diam in vestibulum gravida, turpis lectus tincidunt ante, a pellentesque mi dolor in odio. Nulla vitae nulla ante. In consectetur velit sapien.
            Duis facilisis lacinia tellus et interdum. In id dignissim leo, vel vestibulum massa. Curabitur vitae finibus arcu. Mauris sed iaculis tellus, id euismod tortor. Duis ultrices tellus eu magna laoreet, non aliquam ex iaculis. Quisque pulvinar leo scelerisque faucibus dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam tempus non risus ultricies iaculis. Proin quis erat dignissim, efficitur quam ut, sagittis sem. Quisque ornare tortor mauris, ac iaculis diam faucibus sodales. Ut id rhoncus nibh. Pellentesque sed diam ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in luctus dui, consectetur ullamcorper dui. Morbi at sagittis orci."
            />
          </div>
        </div>
        <div className="w-full flex justify-between mb-4">
          <button>
            <PrettyChangeProfileAvatar />
          </button>
          <button>
            <PrettySaveChanges />
          </button>
        </div>
        <button onClick={()=> setShowExtendedMenu(!showExtendedMenu)} className="w-full space-y-2 mb-4">
          <div className="w-full text-center font-semibold text-sm">Show Extended Menu</div>
          <hr className="border-black border-[0.1rem] bg-black" />
          <div className="flex items-center justify-center w-full">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-bar-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                />
              </svg>
            </button>
          </div>
        </button>
        <ExtendedChangeProfile showState={showExtendedMenu} />
      </div>
    </div>
  );
};

export default ProfileCredentials;
