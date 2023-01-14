import axios from "axios";
import { ReturnFuncDto } from "../../Utils/UtilsDtos";
import { CategoryDto } from "./categoryDtos";

export class CategoryAPI {
  public static async getAllCategories(): Promise<CategoryDto[]> {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/category/`)
      .then(async (resp) => resp.data);
  }

  public static async searchInCategories(inputTitle: string): Promise<CategoryDto[]> {
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/category/search`, {
        title: inputTitle,
      })
      .then(async (resp) => resp.data);
  }

  public static async getCategoryByTitle(title: string): Promise<CategoryDto> {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/category/${title}`)
      .then(async (resp) => resp.data);
  }

  public static async getUserFavoriteCategories(access_token: string): Promise<CategoryDto[]> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/category/`)
      .then((resp) => resp.data);
  }

  public static async getAllCategoriesByDevidedUserFavorites(
    access_token: string
  ): Promise<CategoryDto[]> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/category/devided`
      )
      .then((resp) => resp.data);
  }

  public static async AddFavoriteCategory(
    category_id: string
  ): Promise<ReturnFuncDto> {
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/category/add`,
        {
          category_id: category_id,
        }
      )
      .then((resp) => resp.data);
  }

  public static async RemoveFavoriteCategory(
    category_id: string
  ): Promise<ReturnFuncDto> {
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/account/category/remove`,
        {
          category_id: category_id,
        }
      )
      .then((resp) => resp.data);
  }
}
