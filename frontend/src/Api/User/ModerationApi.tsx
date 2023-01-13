import axios from "axios";
import { UserDto, UserUpdateDto } from "./UserDtos/userDto";

export class ModerationAPI {
  public static async userEditProfile(
    access_token: string,
    userUpdateDto: UserUpdateDto
  ) {
    const resp = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(userUpdateDto),
    });

    const data = await resp.json();

    if (data.access === true)
      window.localStorage.setItem("access_token", data.access_token);

    return data;
  }

  public static async userChangeEmail(access_token: string,userUpdateDto: UserUpdateDto) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/update/email`, userUpdateDto)
      .then((resp) => resp.data);
  }

  public static async userChangePassword(access_token: string, userUpdateDto: UserUpdateDto) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/update/password`, userUpdateDto)
      .then((resp) => resp.data);
  }

  public static async pushUserSocials(access_token: string, userSocialsDto: UserDto['userSocials'][0]) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/socials/update/`,
        userSocialsDto
      )
      .then((resp) => resp.data);
  }

  public static async deleteUserSocial(access_token: string, userSocialsDto: UserDto['userSocials'][0]) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/socials/delete/`,
        userSocialsDto
      )
      .then((resp) => resp.data);
  }

  public static async changeUserAvatar(avatar: any, access_token: string) {
    const formData = new FormData();
    formData.append("avatar", avatar);

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/avatar/`, formData)
      .then((resp) => resp.data);
  }

  public static async removeUserAvatar(access_token: string) {
    return await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/avatar/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  public static async changeUserBackground(avatar: any, access_token: string) {
    const formData = new FormData();
    formData.append("background", avatar);

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/background/`, formData)
      .then((resp) => resp.data);
  }

  public static async removeUserBackground(access_token: string) {
    return await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/background/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  public static async updateUserSettings(
    access_token: string,
    updateDto: UserDto["settings"]
  ) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/profile/update/settings`, {
        email: "www@gmail.com",
        password: "www",
        settings: updateDto,
      })
      .then((resp) => resp.data);
  }
}
