import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { PicService } from '../pic/pic.service';
export declare class CommentService {
    private commentModel;
    private picService;
    constructor(commentModel: Model<CommentDocument>, picService: PicService);
    findAll(): Promise<Comment[]>;
    findCommentByMongooseId(_id: mongoose.Types.ObjectId): Promise<Comment[]>;
    signComment(_id: mongoose.Types.ObjectId | any, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto>;
}
