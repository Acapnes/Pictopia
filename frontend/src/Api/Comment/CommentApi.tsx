import axios from "axios";
import { CommentCreateDto } from "./Comment/commentCreateDto";
import { CommentDto } from "./Comment/commentDto";
import { ReturnFuncDto } from "../UtilsDtos/ReturnFuncDto";

export class CommentAPI {
  public static async getCommentsOfPicture(_id: string): Promise<CommentDto[]> {
    return await axios
      .get(`http://localhost:3000/comments/${_id}`)
      .then((resp) => resp.data);
  }

  public static async getCommentReplies(commentDto: CommentDto): Promise<CommentDto[] | []> {
    if(commentDto?.parentId)
    return await axios.get(`http://localhost:3000/comments/replyof/${commentDto?.parentId}`).then((resp) => resp.data);
    else return await []
  }

  public static async postCommentToPicture(access_token: string,commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto> {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return await axios.post("http://localhost:3000/comments/create", commentCreateDto).then((resp) => resp.data);
  }
}