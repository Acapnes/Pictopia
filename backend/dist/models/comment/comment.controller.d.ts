import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentsService;
    constructor(commentsService: CommentService);
    getUsers(): Promise<Comment[]>;
    userRegister(commentDto: CommentDto): Promise<Comment>;
}
