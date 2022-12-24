import axios from "axios";
import { PicDto } from "../Pic/dtos/picDto";
import { UserDto } from "./UserDtos/userDto";

export class UserAPI {
  public static async fetchUserCredentials(access_token: string) {
    if (!localStorage.getItem("access_token")) return;
    return await fetch("http://localhost:3000/user/profile/credentials", {
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

  public static async getAllUsers() {
    return await axios
      .get("http://localhost:3000/user/")
      .then((resp) => resp.data);
  }

  public static async findUserByUsername(username: string): Promise<UserDto[]> {
    return await axios
      .post("http://localhost:3000/user/find/", {
        username: username,
      })
      .then((resp) => resp.data);
  }
}
