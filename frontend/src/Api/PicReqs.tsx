import { PicDto } from "../Dto/picDto";

export class PicAPI {
  public static async getAllPics(): Promise<PicDto[]> {
    const resp = await fetch("http://localhost:3000/pics", {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }
}
