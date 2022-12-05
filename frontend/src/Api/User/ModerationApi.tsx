import axios from "axios";
import { UserSimpleUpdateDto } from "./UserDtos/userSimpleUpdateDto";

export class ModerationAPI {
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
}
