import axios from "axios";
import { CategoryDto } from "../User/Category/categoryDtos";
import { ReturnFuncDto } from "../Utils/UtilsDtos";
import { PaginationDto, PicDto, UploadPicDto } from "./picDtos";

export class PicAPI {
  public static async getAllPics(): Promise<PicDto[]> {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics`)
      .then((resp) => resp.data);
  }

  public static async getPicsByExplore(
    picPaginationDto: PaginationDto
  ): Promise<PicDto[]> {
    if (window.localStorage.getItem("access_token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${window.localStorage.getItem("access_token")}`;
      return await axios
        .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/account/explore`, {
          currentPage: picPaginationDto.currentPage,
          postPerPage: picPaginationDto.postPerPage,
        })
        .then((resp) => resp.data);
    }
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/explore`, {
        currentPage: picPaginationDto.currentPage,
        postPerPage: picPaginationDto.postPerPage,
      })
      .then((resp) => resp.data);
  }

  public static async getPicsByCategory(picPaginationDto: PaginationDto): Promise<PicDto[]> {
    if (window.localStorage.getItem("access_token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${window.localStorage.getItem("access_token")}`;
      return await axios
        .post(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/pics/account/category`,
          {
            category:
              picPaginationDto?.category!.charAt(0).toLocaleUpperCase() +
              picPaginationDto?.category!.slice(1),
            currentPage: picPaginationDto.currentPage,
            postPerPage: picPaginationDto.postPerPage,
          }
        )
        .then((resp) => resp.data);
    }
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/category`, {
        category:
          picPaginationDto?.category!.charAt(0).toLocaleUpperCase() +
          picPaginationDto?.category!.slice(1),
        currentPage: picPaginationDto.currentPage,
        postPerPage: picPaginationDto.postPerPage,
      })
      .then((resp) => resp.data);
  }

  public static async getPicsBySeachInput(
    picPaginationDto: PaginationDto
  ): Promise<PicDto[]> {
    if (window.localStorage.getItem("access_token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${window.localStorage.getItem("access_token")}`;
      return await axios
        .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/account/search`, {
          input: picPaginationDto?.input,
          currentPage: picPaginationDto?.currentPage,
          postPerPage: picPaginationDto?.postPerPage,
        })
        .then((resp) => resp.data);
    }
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/search`, {
        input: picPaginationDto?.input,
        currentPage: picPaginationDto?.currentPage,
        postPerPage: picPaginationDto?.postPerPage,
      })
      .then((resp) => resp.data);
  }

  public static async getDetailPic(_id: string): Promise<PicDto> {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/${_id}`)
      .then((resp) => resp.data);
  }

  public static async getPicsAlias(_id: string): Promise<PicDto[]> {
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/pics/alias/${_id}`)
      .then(async(resp) =>  await resp.data);
  }

  public static async uploadPicture(
    uploadPicDto: UploadPicDto,
    access_token: string
  ): Promise<ReturnFuncDto> {
    const formData = new FormData();
    formData.append("picture", uploadPicDto.picture);
    formData.append("title", uploadPicDto.title!);
    // formData.append("title", uploadPicDto.title!.charAt(0).toUpperCase() + uploadPicDto.title!.slice(1,uploadPicDto.title!.length));
    formData.append(
      "description",
      uploadPicDto.description ? uploadPicDto.description : ""
    );
    formData.append("creationDate", uploadPicDto?.creationDate?.toUTCString()!);

    uploadPicDto?.categories?.forEach(
      (category: CategoryDto, categoryIndex: number) => {
        formData.append(`categories[${categoryIndex}]`, category._id);
      }
    );

    uploadPicDto?.hashTags?.forEach((hashtag, hashtagIndex) => {
      formData.append(`hashTags[${hashtagIndex}]`, `#${hashtag}`);
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/pics/account/create/`,
        formData
      )
      .then((resp) => resp.data);
  }

  public static async getPicsByBlob(picDto: PicDto) {
    return await axios
      .get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/pics/pretty/${picDto?._id}`,
        {
          responseType: "blob",
        }
      )
      .then((resp) => resp.data);
  }
}
