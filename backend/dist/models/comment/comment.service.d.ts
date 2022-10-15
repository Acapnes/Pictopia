import mongoose, { Model } from 'mongoose';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    findAll(): Promise<Comment[]>;
    findCommentByMongooseId(_id: mongoose.Types.ObjectId): Promise<Comment[]>;
    signComment(commentDto: CommentDto): Promise<Comment>;
}
