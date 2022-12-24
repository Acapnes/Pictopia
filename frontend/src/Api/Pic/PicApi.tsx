import axios from "axios";
import { CategoryDto } from "../User/CategoryDtos/category.dto";
import { ReturnFuncDto } from "../Utils/ReturnFuncDto";
import { PaginationDto } from "./dtos/paginationDto";
import { PicDto } from "./dtos/picDto";
import { UploadPicDto } from "./dtos/uploadPicDto";

export class PicAPI {
  public static async getAllPics(): Promise<PicDto[]> {
    return await axios.get("http://localhost:3000/pics")
      .then((resp) => resp.data);
  }

  public static async getPicsByCategory(picPaginationDto: PaginationDto): Promise<PicDto[]> {
    return await axios.post("http://localhost:3000/pics/category",{
      category: picPaginationDto?.category!.charAt(0).toLocaleUpperCase() + picPaginationDto?.category!.slice(1),
      currentPage: picPaginationDto.currentPage,
      postPerPage: picPaginationDto.postPerPage
    }).then((resp) => resp.data);
  }

  public static async getPicsBySeachInput( picPaginationDto: PaginationDto): Promise<PicDto[]> {
    return await axios.post("http://localhost:3000/pics/search",{
      input: picPaginationDto?.input,
      currentPage: picPaginationDto?.currentPage,
      postPerPage: picPaginationDto?.postPerPage
    }).then((resp) => resp.data);
  }

  public static async getDetailPic(_id: string): Promise<PicDto> {
    return await axios.get(`http://localhost:3000/pics/${_id}`)
      .then((resp) => resp.data);
  }

  public static async uploadPicture(uploadPicDto: UploadPicDto, access_token: string):Promise<ReturnFuncDto> {
    const formData = new FormData();
    formData.append("picture", uploadPicDto.picture);
    formData.append("title", uploadPicDto.title!);
    formData.append("description", uploadPicDto.description ? uploadPicDto.description : "");
    formData.append("creationDate", uploadPicDto?.creationDate?.toUTCString()!)
    
    uploadPicDto?.categories?.forEach((category: CategoryDto, categoryIndex: number) => {
      formData.append(`categories[${categoryIndex}]`, category._id);
    });
    uploadPicDto?.hashTags?.forEach((hashtag,hashtagIndex) => {
      formData.append(`hashTags[${hashtagIndex}]`, `#${hashtag}`);
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`http://localhost:3000/pics/account/create/`, formData)
      .then((resp) => resp.data);
  }

  public static async getPicsByBlob(picDto: PicDto) {
    return await axios.get(`http://localhost:3000/pics/pretty/${picDto?._id}`,{responseType:'blob'}).then((resp) => resp.data);
  }
}
