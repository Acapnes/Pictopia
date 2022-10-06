import mongoose, { Model } from 'mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicCreateDto } from 'src/dto/pic/pic.create.dto';
export declare class PicService {
    private picModel;
    constructor(picModel: Model<PicDocument>);
    findAll(): Promise<Pic[]>;
    findAllActionless(): Promise<Pic[]>;
    getPicById(id: any): Promise<Pic>;
    createPostWithImage(file: any, picCreateDto: PicCreateDto): Promise<Pic & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
