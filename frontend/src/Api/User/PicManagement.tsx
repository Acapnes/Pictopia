import axios from "axios";
import { UploadPicDto } from "../Pic/picDtos";
import { ReturnFuncDto } from "../Utils/UtilsDtos";

export class PicManagementAPI {
  public static async updateAuthorsPicture(picManagementDto: UploadPicDto) {
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/pics/account/update`,
        picManagementDto
      )
      .then((resp) => resp.data);
  }

  public static async deleteAuthorsPicture(
    pictureId: UploadPicDto["_id"]
  ): Promise<ReturnFuncDto> {
    return await axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/pics/account/delete`, {
        _id: pictureId,
      })
      .then((resp) => resp.data);
  }
}
