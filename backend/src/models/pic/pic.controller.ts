import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginationDto } from 'src/dto/pic/pagination.dto';
import { SearchInterceptor } from 'src/helpers/interceptors/search.interceptor';
import { Pic } from 'src/schemas/pic.schema';
import { PicFetchService } from './pic.fetch.service';
import { PicService } from './pic.service';

@Controller('/pics')
export class PicController {
  constructor(
    private readonly picsService: PicService,
    private readonly picFetchService: PicFetchService
    ) {}

  @Get()
  async getPics(): Promise<Pic[]> {
    return this.picsService.findAll();
  }

  @Post()
  async getPicsByPagination(@Body() picPaginationDto: PaginationDto): Promise<Pic[]> {
    return this.picFetchService.picSearchByCategory(picPaginationDto);
  }

  @Post('/alias/:id')
  async getPicsAlias(@Param('id') picture_id, @Body() picPaginationDto: PaginationDto): Promise<Pic[]> {
    return this.picFetchService.picGetAlias(picture_id, picPaginationDto);
  }

  @Get('/pretty/:id')
  async getPrettyPicById(@Res() res, @Param('id') id): Promise<Pic> {
    const picture = await this.picsService.getPicById(id);
    res.setHeader('Content-type', picture.picture_file.contentType);
    return res.send(picture.picture_file.data.buffer)
  }

  @Get(':id')
  async getPicById( @Param('id') id): Promise<Pic> {
    return this.picsService.getPicById(id);
  }

  @Post('/explore')
  async searchInPicturesByExplore(@Body() picPaginationDto: PaginationDto): Promise<Pic[]>{
    return await this.picFetchService.getPicturesByExplore(picPaginationDto)
  }

  @Post('/category')
  async searchInPicturesByCategory(@Body() picPaginationDto: PaginationDto): Promise<Pic[]>{
    return await this.picFetchService.picSearchByCategory(picPaginationDto)
  }

  @Post('/search')
  async searchInPicturesByInput(@Body() picPaginationDto: PaginationDto): Promise<Pic[]>{
    return await this.picFetchService.picSearchByInput(picPaginationDto)
  }

}
  