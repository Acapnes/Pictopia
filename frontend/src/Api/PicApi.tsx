import axios from "axios";
import { PicDto } from "./PicDtos/picDto";
import { UploadPicDto } from "./PicDtos/uploadPicDto";

export class PicAPI {
  public static async getAllPics(): Promise<PicDto[]> {
    return await axios.get("http://localhost:3000/pics")
      .then((resp) => resp.data);
  }

  public static async getDetailPic(_id: string): Promise<PicDto> {
    return await axios.get(`http://localhost:3000/pics/${_id}`)
      .then((resp) => resp.data);
  }

  public static async uploadPicture(uploadPicDto: UploadPicDto, access_token: string) {
    if (!uploadPicDto.title) {
      return {
        success: false,
        message: "Please set a title",
      };
    }

    if (!uploadPicDto?.picture?.size) {
      return {
        success: false,
        message: "Please select a picture",
      };
    }

    const formData = new FormData();
    formData.append("picture", uploadPicDto.picture);
    formData.append("title", uploadPicDto.title);
    formData.append("description", uploadPicDto.description);

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`http://localhost:3000/pics/create/`, formData)
      .then((resp) => resp.data);
  }
}
