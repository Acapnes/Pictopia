import { useEffect, useRef, useState } from "react";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import { PrettyEyeIcon } from "../../components/Prettys/PrettyIcons";
import { ReturnFuncDto } from "../../Api/Utils/UtilsDtos";
import { useToastStore } from "../../components/Zustand/store";
import { AuthAPI } from "../../Api/User/AuthApi";
import { ActionlessGrid } from "../../Picture/Grids/Grids";

const Register: React.FC<{}> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const setToastState = useToastStore((state: any) => state.setToastState);

  const userRegister = async () => {
    AuthAPI.userRegister({
      email: userEmailRef.current!.value!,
      password: userPasswordRef.current!.value!,
      username: userNameRef.current!.value!,
      creationDate: new Date(),
    }).then(
      async (RegisterResp: ReturnFuncDto) =>
        await setToastState(RegisterResp.message)
    );
  };

  useEffect(() => {
    userEmailRef.current!.value = "";
    userPasswordRef.current!.value = "";
    userNameRef.current!.value = "";
  }, []);

  return (
    <div className={`w-full h-full`}>
      <div className="flex justify-center relative">
        <div className="absolute top-0 w-full h-full z-10 bg-gray-900 bg-opacity-70"></div>
        <div className="min-w-screen min-h-screen">
          <ActionlessGrid />
        </div>

        <div className="fixed z-20 mt-14 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-soft-black drop-shadow-xl p-10 shadow-3xl rounded-sm">
          <div className="relative space-y-5 flex flex-col">
            <p className="text-4xl text-center text-gray-200 mt-3">
              User Register
            </p>

            <div className="flex flex-col space-y-3">
              <div className="flex flex-col">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") userRegister();
                  }}
                  ref={userNameRef}
                  type="text"
                  className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
                  placeholder="Username"
                />
                <span className="text-gray-500 text-xs pl-1.5 pt-1">
                  Your public nickname
                </span>
              </div>
              <div className="flex flex-col">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") userRegister();
                  }}
                  ref={userEmailRef}
                  type="email"
                  className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
                  placeholder="Email"
                />
                <span className="text-gray-500 text-xs pl-1.5 pt-1">
                  Allows @gmail, @hotmail, @outlook and more...
                </span>
              </div>
              <div>
                <div className="flex flex-row items-center lg:w-[20rem] md:w-[20rem] w-[15rem] bg-white">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") userRegister();
                    }}
                    ref={userPasswordRef}
                    type={showPassword ? "text" : "password"}
                    className="outline-none px-3 py-4 text-lg w-full"
                    placeholder="Password"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <PrettyEyeIcon show={showPassword} />
                  </div>
                </div>
                <div className="text-gray-500 text-xs pl-1.5 pt-1">
                  <p>At least 8 characters</p>
                  <p>At least 1 lowercase character</p>
                  <p>At least 1 uppercase character</p>
                  <p>At least 1 numeric character</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="w-full flex justify-center items-center">
                <PrettyRainbow onclick={() => userRegister()}>
                  <div className="px-4 py-0.5">
                    <span className="text-white ">SIGN UP</span>
                  </div>
                </PrettyRainbow>
              </div>
              <div className="w-full flex text-center">
                <a
                  href="/login"
                  className=" w-full font-light text-pink-300 text-center"
                >
                  You have an account? Sign in!
                </a>
              </div>
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
