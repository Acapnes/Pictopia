import { UserDto } from "../../../../Api/User/UserDtos/userDto";
import { useEffect, useState } from "react";
import { ModerationAPI } from "../../../../Api/User/ModerationApi";
import { PrettySocialButton } from "../../../../components/Prettys/PrettySocialButtons";
import {
  PrettyCheckIcon,
  PrettySmallArrowDown,
} from "../../../../components/Prettys/PrettyIcons";
import { ReturnFuncDto } from "../../../../Api/Utils/UtilsDtos";
import {
  usePictopiaPublicProfileStore,
  useToastStore,
} from "../../../../components/Zustand/store";

const ProfileSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  const [userSettings, setUserSettings] = useState<UserDto["settings"]>(Object);

  const setProfileSocials = usePictopiaPublicProfileStore(
    (state: any) => state.setProfileSocials
  );

  useEffect(() => {
    (async () => {})();
    setProfileSocials(user?.userSocials);
    setUserSettings(user!.settings);
  }, [user!.settings]);

  return (
    <div className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm">
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <div className="flex flex-col space-y-2 text-gray-200">
          <p className="text-2xl font-bold">Security Permissions</p>
          <div className="flex flex-col space-y-1 text-lg pl-3">
            <div className="flex flex-row items-center space-x-3">
              <span>Private account</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  onChange={() => {
                    setUserSettings({
                      privateAccount: !userSettings?.privateAccount,
                      notification: userSettings?.notification,
                    });
                    ModerationAPI.updateUserSettings(
                      window.localStorage.getItem("access_token")!,
                      {
                        privateAccount: !userSettings.privateAccount,
                        notification: userSettings?.notification,
                      }
                    );
                  }}
                  type="checkbox"
                  className="sr-only peer"
                  checked={userSettings?.privateAccount ? true : false}
                />
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                  after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                  after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
            <span className="text-sm text-gray-400">
              When your account is private, only people you approve can see your
              posted, saved pictures & comments on your profile.
            </span>
            <div className="flex flex-row items-center space-x-3">
              <span>Notifications</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  onChange={() => {
                    setUserSettings({
                      privateAccount: userSettings?.privateAccount,
                      notification: !userSettings?.notification,
                    });
                    ModerationAPI.updateUserSettings(
                      window.localStorage.getItem("access_token")!,
                      {
                        privateAccount: userSettings.privateAccount,
                        notification: !userSettings?.notification,
                      }
                    );
                  }}
                  type="checkbox"
                  className="sr-only peer"
                  checked={userSettings?.notification ? true : false}
                />
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                  after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                  after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-pretty-pink" />
      <div className="flex flex-col space-y-5 p-5 rounded-sm bg-soft-black">
        <AddSocial user={user} />
        <UserSocialList showUrl={true} column />
      </div>
    </div>
  );
};

export default ProfileSocial;

const UserSocialList: React.FC<{
  showUrl: boolean;
  column?: boolean;
}> = ({ column, showUrl }) => {
  const profileSocials = usePictopiaPublicProfileStore(
    (state: any) => state.profileSocials
  );

  return (
    <div
      className={`w-full max-w-[85vw] flex ${
        column ? "flex-col space-y-3" : "flex-row space-x-3"
      }`}
    >
      {profileSocials?.map(
        (social: UserDto["userSocials"]["0"], socialIndex: number) => (
          <PrettySocialButton
            key={socialIndex}
            showUrl={showUrl}
            socialUrl={social.url!}
            platform={social.platform!}
            socialIndex={social.index!}
            border
          ></PrettySocialButton>
        )
      )}
    </div>
  );
};

const AddSocial: React.FC<{ user: UserDto }> = ({ user }) => {
  const [updateSocial, setUpdateSocial] = useState<UserDto["userSocials"][0]>();

  const setToastState = useToastStore((state: any) => state.setToastState);

  const profileSocials = usePictopiaPublicProfileStore(
    (state: any) => state.profileSocials
  );

  const setProfileSocials = usePictopiaPublicProfileStore(
    (state: any) => state.setProfileSocials
  );

  const UpdateSocials = async () => {
    if (updateSocial?.platform && updateSocial?.url) {
      await ModerationAPI.pushUserSocials(
        localStorage.getItem("access_token")!,
        updateSocial!
      ).then(async (loginResp: ReturnFuncDto) => {
        await setToastState(loginResp.message);
        if (loginResp.success === true)
          setProfileSocials([...profileSocials, updateSocial]);
      });
    }
  };

  const SocialSuggestList = [
    "Instagram",
    "Steam",
    "Discord",
    "Github",
    "Facebook",
  ];

  return (
    <div className="w-full flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
      <div className="relative w-full md:w-fit bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] p-0.5 rounded-sm outline-none">
        <div className="w-full h-full flex flex-row bg-soft-black px-2 py-1.5 rounded-sm">
          <input
            tabIndex={1}
            className="w-full h-full flex text-gray-200 pr-1 font-semibold outline-none bg-transparent placeholder:text-sm"
            placeholder="Sign Platform like Pictopia"
            onChange={(e) =>
              setUpdateSocial({
                ...updateSocial,
                platform: e.target.value,
              })
            }
          />

          {/* <div className="group flex items-center">
            <PrettySmallArrowDown size={14} fill={"white"} />
            <div
              className="w-full absolute top-11 left-0 items-start opacity-0 transition duration-100 group-focus-within:opacity-100
             bg-gradient-to-t from-pretty-pink to-pretty-yellow p-0.5 rounded-sm"
            >
              <div className="w-full h-0 group-focus:h-full flex flex-col space-y-1 text-gray-200 truncate bg-soft-black rounded-sm">
                {SocialSuggestList?.map(
                  (suggest: string, suggestIndex: number) => (
                    <button
                      onClick={() => {
                        setUpdateSocial({
                          ...updateSocial,
                          platform: suggest,
                        });
                      }}
                      key={suggestIndex}
                      className="hover:bg-light-soft-black py-1 text-sm"
                    >
                      {suggest}
                    </button>
                  )
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="flex-auto flex flex-row items-center space-x-2">
        <input
          tabIndex={2}
          onChange={(e) =>
            setUpdateSocial({
              ...updateSocial,
              url: e.target.value,
            })
          }
          placeholder="Sign URL like www.pictopia.com"
          type="text"
          className="w-full h-fit outline-none px-2 py-1.5 bg-transparent border-[1px] border-pretty-rough-pink text-gray-200 placeholder:text-sm"
        />
        {
          <div className="flex items-center">
            <button
              onClick={() => {
                UpdateSocials();
              }}
              className="w-fit h-fit bg-pretty-pink p-1 rounded-sm"
            >
              <PrettyCheckIcon fill={"black"} />
            </button>
          </div>
        }
      </div>
    </div>
  );
};
