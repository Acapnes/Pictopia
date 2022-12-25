import axios from "axios";
import { CommentCreateDto } from "./dtos/commentCreateDto";
import { CommentDto, CommentManagementDto } from "./dtos/commentDto";
import { ReturnFuncDto } from "../Utils/ReturnFuncDto";

export class CommentAPI {
  public static async getCommentsOfPicture(_id: string): Promise<CommentDto[]> {
    return await axios
      .get(`http://localhost:3000/comments/${_id}`)
      .then((resp) => resp.data);
  }

  public static async getCommentReplies(commentDto: CommentDto): Promise<CommentDto[] | []> {
    if(commentDto?._id)
    return await axios.get(`http://localhost:3000/comments/replyof/${commentDto?._id}`).then((resp) => resp.data);
    else return await []
  }

  public static async postCommentToPicture(access_token: string, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post("http://localhost:3000/comments/create", commentCreateDto).then((resp) => resp.data);
  }

  public static async deleteCommentOrReply(access_token: string, commentManagementDto: CommentManagementDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post("http://localhost:3000/comments/delete", commentManagementDto).then((resp) => resp.data);
  }

  public static async postReplyToPicturesComment(access_token: string, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post("http://localhost:3000/comments/create/reply", commentCreateDto).then((resp) => resp.data);
  }
}
