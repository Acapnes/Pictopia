import { CommentCreateDto } from 'src/dto/comment/comment.create.dto';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentManagementService } from './comment.management.service';
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    private readonly commentManagementService;
    constructor(commentService: CommentService, commentManagementService: CommentManagementService);
    getAllComments(): Promise<Comment[]>;
    getCommentsById(_id: any): Promise<Comment[]>;
    getCommentsReply(destComment: any): Promise<Comment[]>;
    commentCreate(req: any, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto>;
    commentReplyCreate(req: any, commentCreateDto: CommentCreateDto): Promise<ReturnFuncDto>;
    commentDelete(commentDto: CommentDto): Promise<ReturnFuncDto>;
}
