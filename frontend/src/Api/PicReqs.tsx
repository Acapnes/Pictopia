import { PicDto } from "./PicDtos/picDto";

export class PicAPI {
  public static async getAllPics(): Promise<PicDto[]> {
    const resp = await fetch("http://localhost:3000/pics", {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }

  public static async getDetailPic(_id: string): Promise<PicDto> {
    const resp = await fetch(`http://localhost:3000/pics/${_id}`, {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }
}
