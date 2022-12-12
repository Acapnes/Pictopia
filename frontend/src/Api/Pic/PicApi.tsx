import axios from "axios";
import { MultiFuncs } from "../../components/Functions/MultipleFuncs";
import { CategoryDto } from "../User/CategoryDtos/category.dto";
import { ReturnFuncDto } from "../Utils/ReturnFuncDto";
import { PicDto } from "./dtos/picDto";
import { PicSearchDto } from "./dtos/picSearchDto";
import { UploadPicDto } from "./dtos/uploadPicDto";

export class PicAPI {
  public static async getAllPics(): Promise<PicDto[]> {
    return await axios.get("http://localhost:3000/pics")
      .then((resp) => resp.data);
  }

  public static async getPicsByCategory(picSearchDto:PicSearchDto): Promise<PicDto[]> {
    return await axios.post("http://localhost:3000/pics/category",{
      category: picSearchDto?.category!.charAt(0).toLocaleUpperCase() + picSearchDto?.category!.slice(1),
      currentPage: picSearchDto.currentPage,
      postPerPage: picSearchDto.postPerPage
    }).then((resp) => resp.data);
  }

  public static async getPicsBySeachInput( picSearchDto: PicSearchDto): Promise<PicDto[]> {
    return await axios.post("http://localhost:3000/pics/search",{
      input: picSearchDto?.input,
      currentPage: picSearchDto?.currentPage,
      postPerPage: picSearchDto?.postPerPage
    }).then((resp) => resp.data);
  }

  public static async getDetailPic(_id: string): Promise<PicDto> {
    return await axios.get(`http://localhost:3000/pics/${_id}`)
      .then((resp) => resp.data);
  }

  public static async uploadPicture(uploadPicDto: UploadPicDto, access_token: string):Promise<ReturnFuncDto> {
    const formData = new FormData();
    formData.append("picture", uploadPicDto.picture);
    formData.append("title", uploadPicDto.title);
    formData.append("description", uploadPicDto.description);
    
    uploadPicDto.categories.forEach((category:CategoryDto ,categoryIndex:number) => {
      formData.append(`categories[${categoryIndex}]`, category._id);
    });
    uploadPicDto.hashTags.forEach((hashtag,hashtagIndex) => {
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
