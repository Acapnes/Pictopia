import axios from "axios";
import { CommentDto } from "./PicDtos/commentDto";
import { PicDto } from "./PicDtos/picDto";
import { UploadPicDto } from "./PicDtos/uploadPicDto";

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

  public static async getCommentsOfPicture(_id: string): Promise<CommentDto[]> {
    const resp = await fetch(`http://localhost:3000/comments/${_id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    const data = await resp.json();

    return data;
  }

  public static async uploadPicture(uploadPicDto:UploadPicDto, access_token: string){

    console.log(uploadPicDto.picture)
    if(!uploadPicDto.title){
      return{
        success:false,
        message:"Please set a title"
      }
    }

    if(!uploadPicDto?.picture?.size){
      return{
        success:false,
        message:"Please select a picture"
      }
    }

    const formData = new FormData();
    formData.append("picture", uploadPicDto.picture);
    formData.append("title", uploadPicDto.title);
    formData.append("description", uploadPicDto.description);

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
    return await axios.post(`http://localhost:3000/pics/create/`,formData).then(resp => resp.data)
  }
}
