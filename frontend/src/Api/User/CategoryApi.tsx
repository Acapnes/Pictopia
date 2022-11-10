import axios from "axios";
import { CategoryDto } from "../UtilsDtos/category.dto";

export class CategoryAPI {
  public static async getAllCategories(): Promise<CategoryDto[]> {
    return await axios
      .get("http://localhost:3000/category/")
      .then((resp) => resp.data);
  }

  public static async getUserFavoriteCategories(access_token: string): Promise<CategoryDto[]> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.get("http://localhost:3000/user/profile/category/")
      .then((resp) => resp.data);
  }
}
