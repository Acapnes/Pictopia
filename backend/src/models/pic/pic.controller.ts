import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
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
  async getPicsByPagination(@Body() picSearchDto: PicSearchDto): Promise<Pic[]> {
    return this.picFetchService.picSearchByCategory(picSearchDto);
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

  @Post('/category')
  async searchInPicturesByCategory(@Body() picSearchDto: PicSearchDto): Promise<Pic[]>{
    return await this.picFetchService.picSearchByCategory(picSearchDto)
  }

  @UseInterceptors(SearchInterceptor)
  @Post('/search')
  async searchInPicturesByInput(@Body() picSearchDto: PicSearchDto): Promise<Pic[]>{
    return await this.picFetchService.picSearchByInput(picSearchDto)
  }

}
  