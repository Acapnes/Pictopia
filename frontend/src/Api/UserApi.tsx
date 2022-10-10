import { UserRegistrationDto } from "./UserDtos/userRegistrationDto";
import { UserValidationDto } from "./UserDtos/userValidationDto";

export class UserAPI {
  public static async userLogin(userValidationDto: UserValidationDto) {
    if (userValidationDto.email === "" || userValidationDto.password === "") {
      return {
        access: false,
        message: "Please fill in the blanks",
      };
    }

    const resp = await fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userValidationDto),
    });

    if (resp.status === (400 || 404 || 500))
      return {
        access: false,
        message: "Access verification failed",
      };

    const data = await resp.json();

    if (data.access === true) {
      window.localStorage.setItem("access_token", data.access_token);
      window.location.href = "/";
    }
    return data;
  }

  public static async userRegister(userRegistrationDto: UserRegistrationDto) {
    if (
      userRegistrationDto.email === "" ||
      userRegistrationDto.password === "" ||
      userRegistrationDto.birthDate === "" ||
      userRegistrationDto.username === ""
    ) {
      return {
        access: false,
        message: "Please fill in the blanks",
      };
    }

    const resp = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegistrationDto),
    });

    if (resp.status === (400 || 404 || 500))
      return {
        access: false,
        message: "User registration failed",
      };

    const data = await resp.json();

    if (data.access === true) {
      window.localStorage.setItem("access_token", data.access_token);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    return data;
  }
}