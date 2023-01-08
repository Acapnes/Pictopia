import { ReturnFuncDto } from "../Utils/UtilsDtos";
import { UserRegistrationDto, UserValidationDto } from "./UserDtos/userDto";

export class AuthAPI {
  public static async userLogin(userValidationDto: UserValidationDto) {
    const resp = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userValidationDto),
    });

    const data = await resp.json();

    if (resp.status === (400 || 404 || 500))
      return {
        access: false,
        message: data.message[0],
      };

    if (data.access === true) {
      window.localStorage.setItem("access_token", data.access_token);
      window.location.href = "/";
    }
    return data;
  }

  public static async userRegister(userRegistrationDto: UserRegistrationDto): Promise<ReturnFuncDto> {
    const resp = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegistrationDto),
    });

    const data = await resp.json();

    if (resp.status === (400 || 404 || 500))
      return {
        success: false,
        message: data.message[0],
      };

    if (data.access === true) {
      window.localStorage.setItem("access_token", data.access_token);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }

    return data;
  }
}
