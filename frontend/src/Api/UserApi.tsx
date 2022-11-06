import axios from "axios";
import { PicDto } from "./PicDtos/picDto";
import { UserDto } from "./UserDtos/userDto";
import { UserRegistrationDto } from "./UserDtos/userRegistrationDto";
import { UserSimpleUpdateDto } from "./UserDtos/userSimpleUpdateDto";
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

    const data = await resp.json();

    if (resp.status === (400 || 404 || 500))
      return {
        access: false,
        message: data.message[0],
      };

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

  public static async userEditProfile(
    access_token: string,
    userSimpleUpdateDto: UserSimpleUpdateDto
  ) {
    const resp = await fetch(
      "http://localhost:3000/user/profile/update/simple",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(userSimpleUpdateDto),
      }
    );

    const data = await resp.json();

    if (data.access === true)
      window.localStorage.setItem("access_token", data.access_token);

    return data;
  }

  public static async changeUserAvatar(avatar: any, access_token: string) {
    const formData = new FormData();
    formData.append("avatar", avatar);

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(`http://localhost:3000/user/profile/update/avatar/`, formData)
      .then((resp) => resp.data);
  }

  public static async removeUserAvatar(access_token: string) {
    if (!localStorage.getItem("access_token")) return;
    return await fetch(
      "http://localhost:3000/user/profile/update/avatar/remove",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  public static async getSavedPicturesOfUser(access_token: string) {
    if (!localStorage.getItem("access_token")) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .get("http://localhost:3000/user/profile/saved")
      .then((resp) => resp.data);
  }

  public static async savedPicturesToUserAlbum(access_token: string,picDto: PicDto) {
    if (!localStorage.getItem("access_token")) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post("http://localhost:3000/user/profile/saved/add", {
        picture_id: picDto._id,
      })
      .then((resp) => resp.data);
  }

  public static async getAllUsers() {
    return await axios
      .get("http://localhost:3000/user/")
      .then((resp) => resp.data);
  }

  public static async findUserByUsername(username: string) {
    return await axios
      .post("http://localhost:3000/user/find/", {
        username: username,
      })
      .then((resp) => resp.data);
  }
}
