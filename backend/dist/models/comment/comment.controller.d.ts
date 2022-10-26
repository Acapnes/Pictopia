import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentsService;
    constructor(commentsService: CommentService);
    getAllComments(): Promise<Comment[]>;
    getCommentsById(_id: any): Promise<Comment[]>;
    commentCreate(req: any, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto>;
}
