import axios from "axios";
import { PicDto } from "../Pic/picDtos";

export class AccountAPI {
  public static async getSavedPicturesOfUser(username: string) {
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/saved`, {
        username: username,
        currentPage: 0,
        postPerPage: 20,
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err: any) => {
        return {
          success: false,
          message: err.response.data.message,
        };
      });
  }

  public static async GetUsersPostedPictures(username: string) {
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/posted`, {
        username: username,
        currentPage: 0,
        postPerPage: 20,
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err: any) => {
        return {
          success: false,
          message: err.response.data.message,
        };
      });
  }

  public static async savedPicturesToUserAlbum(
    access_token: string,
    picDto: PicDto
  ) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/saved/add`,
        {
          picture_id: picDto._id,
        }
      )
      .then((resp) => resp.data);
  }

  public static async VisitProfileFetchUser(username: string) {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/${username}`)
      .then((resp) => resp.data);
  }

  public static async GetUsersLastSearchedList(access_token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/recently/searched`
      )
      .then((resp) => resp.data);
  }

  public static async DeleteUserLastSearched(
    access_token: string,
    searchText: string
  ) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/recently/searched/delete`,
        {
          searchText: searchText,
        }
      )
      .then((resp) => resp.data);
  }

  public static async GetUsersPostedComments(username: string) {
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/comments`, {
        username: username,
      })
      .then((resp) => resp.data);
  }
}
