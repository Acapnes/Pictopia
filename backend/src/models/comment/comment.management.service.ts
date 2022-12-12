import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { PicService } from '../pic/pic.service';
import { CommentDto } from 'src/dto/comment/comment.dto';

@Injectable()
export class CommentManagementService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private picService: PicService
  ) {}

  async deteleCommentById(_id:mongoose.Types.ObjectId): Promise<ReturnFuncDto> {
    return await this.commentModel.findByIdAndDelete({_id:_id}).then(async(comment: any)=>{
        return await this.commentModel.findById({_id:comment._id}).then((findResult:any) => {
            if(!findResult){
                return{
                    success:true,
                    message:"Comment has been deleted"
                }
            }
            return{
                success:false,
                message:"Comment NOT deleted"
            }
        })
    })
  }
}
