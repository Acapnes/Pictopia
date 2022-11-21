import { useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import CustomAlert from "../../components/Views/CustomAlert";
import { PrettyAuthButton } from "../../components/Prettys/PrettyButtons";
import { PrettyEyeIcon } from "../../components/Prettys/PrettyIcons";
import ActionlessGrid from "../../Picture/Grids/ActionlessGrid";

const Register: React.FC<{}> = () => {
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
      className={`w-full h-full`}
    >
      <div className="flex justify-center relative">
        <div className="absolute top-0 w-full h-full z-10 bg-gray-900 bg-opacity-70"></div>
        <div className="min-w-screen min-h-screen">
          <ActionlessGrid />
        </div>

        <div className="fixed z-20 mt-14 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-soft-black drop-shadow-xl p-12 shadow-3xl rounded-sm">
          <div className="relative space-y-5 flex flex-col ">
            <CustomAlert result={registerResult} />
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
              <a
                href="/login"
                className=" w-full font-light text-pink-300 text-center"
              >
                You have an account? Sign in!
              </a>
            </div>

            <div className="absolute -top-[4rem] md:-top-[5rem] lg:-top-[6rem] xl:-top-[5.8rem] 2xl:-top-[5rem] left-1/2  -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
              <img src="/pictopia_trans.png" alt="" className="rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
