import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentsService;
    constructor(commentsService: CommentService);
    getAllComments(): Promise<Comment[]>;
    getCommentsById(_id: any): Promise<Comment[]>;
    commentCreate(commentDto: CommentDto): Promise<Comment>;
}
