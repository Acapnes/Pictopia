import { UserDto } from "./UserDtos/userDto";
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

  public static async fetchUserCredentials(access_token: string) {
    if (!localStorage.getItem("access_token")) return;
    return await fetch("http://localhost:3000/user/credentials", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  public static async userEditProfile(access_token: string, userDto: UserDto) {
    const resp = await fetch("http://localhost:3000/user/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(userDto),
    });

    const data = await resp.json();

    if (data.access === true)
      window.localStorage.setItem("access_token", data.access_token);

    return data;
  }
}
