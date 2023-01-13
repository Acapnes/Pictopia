import axios from "axios";
import { CommentCreateDto, CommentDto, CommentManagementDto } from "./commentDtos";
import { ReturnFuncDto } from "../Utils/UtilsDtos";

export class CommentAPI {
  public static async getCommentsOfPicture(_id: string): Promise<CommentDto[]> {
    return await axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/comments/${_id}`)
      .then((resp) => resp.data);
  }

  public static async getCommentReplies(commentDto: CommentDto): Promise<CommentDto[] | []> {
    if(commentDto?._id)
    return await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/comments/replyof/${commentDto?._id}`).then((resp) => resp.data);
    else return await []
  }

  public static async postCommentToPicture(access_token: string, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/comments/create`, commentCreateDto).then((resp) => resp.data);
  }

  public static async deleteCommentOrReply(access_token: string, commentManagementDto: CommentManagementDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/comments/delete`, commentManagementDto).then((resp) => resp.data);
  }

  public static async postReplyToPicturesComment(access_token: string, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/comments/create/reply`, commentCreateDto).then((resp) => resp.data);
  }
}
