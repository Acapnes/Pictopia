import axios from "axios";
import { ReturnFuncDto } from "../UtilsDtos/ReturnFuncDto";
import { CategoryDto } from "./CategoryDtos/category.dto";

export class CategoryAPI {
  public static async getAllCategories(): Promise<CategoryDto[]> {
    return await axios
      .get("http://localhost:3000/category/")
      .then(async (resp) =>await resp.data);
  }

  public static async getUserFavoriteCategories(access_token: string): Promise<CategoryDto[]> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.get("http://localhost:3000/user/profile/category/")
      .then((resp) => resp.data);
  }

  public static async getAllCategoriesByDevidedUserFavorites(access_token: string): Promise<CategoryDto[]> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.get("http://localhost:3000/user/profile/category/devided")
      .then((resp) => resp.data);
  }

  public static async AddFavoriteCategory(category_id: string):Promise<ReturnFuncDto> {
    return await axios
      .post(`http://localhost:3000/user/profile/category/add`, {
        category_id: category_id,
      })
      .then((resp) => resp.data);
  }
}
