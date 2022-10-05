import React, { useState } from "react";
import { PrettyLogin } from "../components/PrettyButtons";
import { PrettyEyeIcon } from "../components/PrettyIcons";
import ActionlessGrid from "../Grids/ActionlessGrid";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
              type="text"
              className="outline-none px-3 py-4 text-lg lg:w-[20rem] md:w-[20rem] w-[15rem]"
              placeholder="Email or Username"
            />
            <div className="flex flex-row lg:w-[20rem] md:w-[20rem] w-[15rem] bg-white">
              <input
                type={showPassword ? "text" : "password"}
                className="outline-none px-3 py-4 text-lg w-full"
                placeholder="Password"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                <PrettyEyeIcon show={showPassword} />
              </button>
            </div>

            <div className="w-full flex flex-row space-x-2 items-center ">
              <input type="checkbox" className="accent-pink-500 w-4 h-4" />
              <span className="text-white">Don't forget me!</span>
            </div>

            <button className="w-full flex justify-center items-center">
              <PrettyLogin />
            </button>

            <div className="w-full flex items-center">
              <a href="/" className=" font-light text-pink-300 text-center">
                Don't have an account? Come on Join us now!
              </a>
            </div>

            <div className="absolute -top-20 left-1/2  -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
              <img src="/piclogo.png" alt="" className="rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
