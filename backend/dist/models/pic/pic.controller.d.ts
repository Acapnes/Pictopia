import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicService } from './pic.service';
export declare class PicController {
    private readonly picsService;
    constructor(picsService: PicService);
    getPics(): Promise<Pic[]>;
    getPrettyPicById(res: any, req: any, id: any): Promise<Pic>;
    getPicById(id: any): Promise<Pic>;
    uploadPicture(file: any, req: any, body: any): Promise<ReturnFuncDto>;
    searchInPictures(picSearchDto: PicSearchDto): Promise<Pic[]>;
}
