import { Model } from 'mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicDto } from 'src/dto/pic/pic.create.dto';
import { CommentDto } from 'src/dto/comment/comment.dto';
export declare class PicService {
    private picModel;
    constructor(picModel: Model<PicDocument>);
    findAll(): Promise<Pic[]>;
    findOneCommentAndPopulate(_id: string): Promise<Pic>;
    findByMongoId(picId: any): Promise<Pic>;
    create(picDto: PicDto): Promise<Pic>;
    createComment(commentDto: CommentDto): Promise<Pic>;
}
