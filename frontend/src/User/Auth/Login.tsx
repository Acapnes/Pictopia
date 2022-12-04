import React, { useEffect, useRef, useState } from "react";
import { UserAPI } from "../../Api/User/UserApi";
import { PrettyRainbow } from "../../components/Prettys/PrettyComponents";
import { PrettyEyeIcon } from "../../components/Prettys/PrettyIcons";
import ActionlessGrid from "../../Picture/Grids/ActionlessGrid";
import { useToastStore } from "../../components/Zustand/store";
import { ReturnFuncDto } from "../../Api/UtilsDtos/ReturnFuncDto";

const Login: React.FC<{}> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const setToastState = useToastStore((state: any) => state.setToastState);

  const userLogin = async () => {
    await UserAPI.userLogin({
      email: userEmailRef.current!.value!,
      password: userPasswordRef.current!.value!,
    }).then(
      async (loginResp: ReturnFuncDto) => await setToastState(loginResp.message)
    );
  };

  useEffect(() => {
    userEmailRef.current!.value = "";
    userPasswordRef.current!.value = "";
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center relative">
        <div className="absolute top-0 w-full h-full z-10 bg-gray-900 bg-opacity-70"></div>
        <div className="min-w-screen min-h-screen">
          <ActionlessGrid />
        </div>

        <div className="fixed z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-soft-black drop-shadow-xl p-12 shadow-3xl rounded-sm">
          <div className="relative space-y-5 flex flex-col ">
            <p className="text-4xl text-center text-gray-200 mt-3">
              User Login
            </p>
            <input
              ref={userEmailRef}
              type="text"
              className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
              placeholder="Email or Username"
            />
            <div className="flex flex-row items-center lg:w-[20rem] md:w-[20rem] w-[15rem] bg-white">
              <input
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

            <div className="w-full flex flex-row space-x-2 items-center ">
              <input type="checkbox" className="accent-pink-500 w-4 h-4" />
              <span className="text-white">Don't forget me!</span>
            </div>

            <div className="w-full flex justify-center items-center">
              <PrettyRainbow onclick={() => userLogin()}>
                <div className="px-4 py-0.5">
                  <span className="text-white ">SIGN IN</span>
                </div>
              </PrettyRainbow>
            </div>

            <div className="w-full flex flex-col space-y-1 items-center">
              <a
                href="/register"
                className=" font-light text-pink-300 text-center underline"
              >
                Don't have an account? Come on Join us now!
              </a>
              <a href="/" className=" font-light text-pink-500 text-center">
                I will just look...
              </a>
            </div>

            <div className="absolute -top-[6rem] md:-top-[6rem] lg:-top-[6rem] xl:-top-[6rem] 2xl:-top-[6rem] left-1/2  -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
              <img
                src="/pictopia_trans.png"
                alt=""
                className="rounded-sm h-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
