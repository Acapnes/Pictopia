import { CategoryDto } from "./Utils/category.dto";

export class CategoryAPI {
  public static async getAllCategories(): Promise<CategoryDto[]> {
    const resp = await fetch("http://localhost:3000/category/", {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }
}
