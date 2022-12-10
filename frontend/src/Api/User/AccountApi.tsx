import axios from "axios";
import { PicDto } from "../Pic/dtos/picDto";

export class AccountAPI {
  public static async getSavedPicturesOfUser(username: string) {
    return await axios
      .post("http://localhost:3000/user/account/saved", {
        username: username,
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err: any) => {
        return {
          success: false,
          message: err.response.data.message,
        }
      });
  }

  public static async savedPicturesToUserAlbum(
    access_token: string,
    picDto: PicDto
  ) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post("http://localhost:3000/user/account/saved/add", {
        picture_id: picDto._id,
      })
      .then((resp) => resp.data);
  }

  public static async VisitProfileFetchUser(username: string) {
    return await axios
      .get(`http://localhost:3000/user/${username}`)
      .then((resp) => resp.data);
  }

  public static async GetUsersLastSearchedList(access_token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .get(`http://localhost:3000/user/searched/last`)
      .then((resp) => resp.data);
  }

  public static async GetUsersPostedPictures(username: string) {
    return await axios
      .post(`http://localhost:3000/user/account/posted`, {
        username: username,
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err: any) => {
        return {
          success: false,
          message: err.response.data.message,
        }
      });
  }

  public static async GetUsersPostedComments(username: string) {
    return await axios
      .post(`http://localhost:3000/user/account/comments`, {
        username: username,
      })
      .then((resp) => resp.data);
  }
}
