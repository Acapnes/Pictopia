import { PaginationDto } from 'src/dto/pic/pagination.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicFetchService } from './pic.fetch.service';
import { PicService } from './pic.service';
export declare class PicController {
    private readonly picsService;
    private readonly picFetchService;
    constructor(picsService: PicService, picFetchService: PicFetchService);
    getPics(): Promise<Pic[]>;
    getPicsByPagination(picPaginationDto: PaginationDto): Promise<Pic[]>;
    getPicsAlias(picture_id: any, picPaginationDto: PaginationDto): Promise<Pic[]>;
    getPrettyPicById(res: any, id: any): Promise<Pic>;
    getPicById(id: any): Promise<Pic>;
    searchInPicturesByExplore(picPaginationDto: PaginationDto): Promise<Pic[]>;
    searchInPicturesByCategory(picPaginationDto: PaginationDto): Promise<Pic[]>;
    searchInPicturesByInput(picPaginationDto: PaginationDto): Promise<Pic[]>;
}
