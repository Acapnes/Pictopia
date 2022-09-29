import { CommentDto } from 'src/dto/comment/comment.dto';
import { PicDto } from 'src/dto/pic/pic.create.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicService } from './pic.service';
export declare class PicController {
    private readonly picsService;
    constructor(picsService: PicService);
    getUsers(): Promise<Pic[]>;
    getOnePopulatedComment(_id: string): Promise<Pic>;
    userRegister(picDto: PicDto): Promise<Pic>;
    commentCreate(commentDto: CommentDto): Promise<Pic>;
}
