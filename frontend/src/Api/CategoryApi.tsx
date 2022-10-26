import axios from "axios";
import { CategoryDto } from "./Utils/category.dto";

export class CategoryAPI {
  public static async getAllCategories(): Promise<CategoryDto[]> {
    return await axios.get("http://localhost:3000/category/")
    .then((resp) => resp.data);
  }
}
