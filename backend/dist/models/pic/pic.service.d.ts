import mongoose, { Model } from 'mongoose';
import { Pic, PicDocument } from 'src/schemas/pic.schema';
import { PicCreateDto } from 'src/dto/pic/pic.create.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
export declare class PicService {
    private picModel;
    constructor(picModel: Model<PicDocument>);
    findAll(): Promise<Pic[]>;
    getPicById(id: any): Promise<Pic>;
    createPostWithImage(authorPicId: mongoose.Types.ObjectId | any, file: any, picCreateDto: PicCreateDto): Promise<ReturnFuncDto>;
}
