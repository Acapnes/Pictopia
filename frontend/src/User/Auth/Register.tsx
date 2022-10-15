import { useState } from "react";
import { UserAPI } from "../../Api/UserApi";
import { PrettyAuthButton } from "../../components/PrettyButtons";
import { PrettyEyeIcon } from "../../components/PrettyIcons";
import ActionlessGrid from "../../Grids/ActionlessGrid";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirthDate, setUserBirthDate] = useState(Date);
  const [userPassword, setUserPassword] = useState(Date);
  const [registerResult, setRegisterResult] = useState(Object);

  const userRegister = async () => {
    UserAPI.userRegister({
      email: userEmail,
      password: userPassword,
      username: userName,
      birthDate: userBirthDate,
    }).then((resp) =>
      setRegisterResult({
        access: resp.access,
        message: resp.message,
      })
    );
  };

  return (
    <div
      className={`w-full h-full ${
        registerResult?.access ? "cursor-wait" : "cursor-auto"
      }`}
    >
      <div className="flex justify-center relative">
        <div className="absolute top-0 w-full h-full z-10 bg-gray-900 bg-opacity-70"></div>
        <div className="min-w-screen min-h-screen">
          <ActionlessGrid />
        </div>

        <div className="fixed z-20 mt-14 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-soft-black drop-shadow-xl p-12 shadow-3xl rounded-sm">
          <div className="relative space-y-5 flex flex-col ">
            <p className="text-4xl text-center text-gray-200 mt-3">
              User Register
            </p>

            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
              placeholder="Username"
            />
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
              placeholder="Email"
            />

            <div className="flex flex-row lg:w-[20rem] md:w-[20rem] w-[15rem] bg-white">
              <input
                onChange={(e) => setUserPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="outline-none px-3 py-4 text-lg w-full"
                placeholder="Password"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                <PrettyEyeIcon show={showPassword} />
              </button>
            </div>

            <input
              onChange={(e) => setUserBirthDate(e.target.value)}
              type="date"
              className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
            />

            <div className="w-full flex justify-center items-center">
              <button onClick={() => userRegister()}>
                <PrettyAuthButton text={"SIGN UP"} />
              </button>
            </div>

            <div className="w-full flex text-center">
              <a href="/login" className=" w-full font-light text-pink-300 text-center">
                You have an account? Sign in!
              </a>
            </div>

            <div className="absolute -top-20 left-1/2  -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
              <img src="/piclogo.png" alt="" className="rounded-sm" />
            </div>

            <div
              className={`${
                registerResult?.message ? "block" : "hidden"
              } absolute -top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full`}
            >
              <div className="w-full h-full bg-soft-black p-4 text-white flex flex-row space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="bi bi-exclamation-octagon-fill w-fit"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                {/* yönlendirme yap */}
                <p
                  className={`w-full h-full text-center font-semibold whitespace-pre ${
                    registerResult?.access ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {registerResult?.message}
                  {registerResult?.access ? "\nLocating to login" : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
