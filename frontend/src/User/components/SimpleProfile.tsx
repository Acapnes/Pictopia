import { useEffect, useState } from "react";
import { UserAPI } from "../../Api/UserApi";
import CustomAlert from "../../components/CustomAlert";
import { PrettySaveChanges } from "../../components/PrettyButtons";

const SimpleProfile = (props: any) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState("");
  const [inputBio, setInputBio] = useState("");
  const [simpleUpdateResult, setSimpleUpdateResult] = useState(Object);

  const simpleUpdateProfile = async () => {
    if (window.localStorage.getItem("access_token")) {
      await UserAPI.userEditProfile(
        window.localStorage.getItem("access_token")!,
        {
          username: inputUsername,
          name: inputName,
          birthDate: inputBirthDate,
          bio: inputBio,
        }
      ).then((resp) => setSimpleUpdateResult(resp));
    }
  };

  return (
    <div
      className={`h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10`}
    >
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold text-gray-200">Email</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800 cursor-no-drop"
          placeholder={props?.user?.email}
          readOnly
        />
      </div>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold text-gray-200">Username</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.username}
          onChange={(e) => setInputUsername(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold text-gray-200">Name</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.name}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="text-center flex items-center">
          <p className="font-semibold text-gray-200">BirthDate</p>
        </div>
        <input
          type="text"
          className="w-full px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800"
          placeholder={props?.user?.birthDate}
          onChange={(e) => setInputBirthDate(e.target.value)}
        />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-2 h-full">
        <div className="text-center flex items-center">
          <p className="font-semibold text-gray-200">Bio</p>
        </div>
        <textarea
          className="w-full h-full break-words px-5 py-4 outline-none bg-white shadow-xl rounded-sm text-gray-800 resize-none"
          placeholder={props?.user?.bio}
          onChange={(e) => setInputBio(e.target.value)}
        />
      </div>
      <div className={`md:col-span-2 lg:col-span-4 w-full flex ${simpleUpdateResult?.message ? "justify-between":"justify-end"} mt-5 `}>
        <CustomAlert result={simpleUpdateResult} />
        <div>
          <button onClick={() => simpleUpdateProfile()}>
            <PrettySaveChanges />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfile;
