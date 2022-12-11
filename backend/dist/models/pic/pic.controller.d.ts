import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicFetchService } from './pic.fetch.service';
import { PicService } from './pic.service';
export declare class PicController {
    private readonly picsService;
    private readonly picFetchService;
    constructor(picsService: PicService, picFetchService: PicFetchService);
    getPics(): Promise<Pic[]>;
    getPicsByPagination(picSearchDto: PicSearchDto): Promise<Pic[]>;
    getPrettyPicById(res: any, id: any): Promise<Pic>;
    getPicById(id: any): Promise<Pic>;
    searchInPicturesByCategory(picSearchDto: PicSearchDto): Promise<Pic[]>;
    searchInPicturesByInput(picSearchDto: PicSearchDto): Promise<Pic[]>;
}
