import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicFetchService } from './pic.fetch.service';
import { PicService } from './pic.service';
export declare class PicController {
    private readonly picsService;
    private readonly picFetchService;
    constructor(picsService: PicService, picFetchService: PicFetchService);
    getPics(): Promise<Pic[]>;
    getPrettyPicById(res: any, req: any, id: any): Promise<Pic>;
    getPicById(id: any): Promise<Pic>;
    uploadPicture(file: any, req: any, body: any): Promise<ReturnFuncDto>;
    getPicsByPagination(picSearchDto: PicSearchDto): Promise<Pic[]>;
    searchInPicturesByCategory(picSearchDto: PicSearchDto): Promise<Pic[]>;
    searchInPicturesByInput(picSearchDto: PicSearchDto): Promise<Pic[]>;
}
