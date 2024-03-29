import axios from "axios";
import { UserDto } from "./UserDtos/userDto";

export class UserAPI {
  public static async fetchUserCredentials(access_token: string) {
    if (!localStorage.getItem("access_token")) return;
    return await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/credentials`,
      {
        method: "GET",
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

  public static async getAllUsers() {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/`)
      .then((resp) => resp.data);
  }

  public static async findUserByUsername(username: string): Promise<UserDto[]> {
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/find/`, {
        username: username,
      })
      .then((resp) => resp.data);
  }
}
