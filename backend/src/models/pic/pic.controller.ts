import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @UseInterceptors(FileInterceptor('picture'))
  async uploadPicture(@UploadedFile() file, @Req() req, @Body() body): Promise<ReturnFuncDto>{
    return await this.picsService.createPostWithImage(req.user,file,body)
  }  

  @Post('/category')
  async searchInPicturesByCategory(@Body() picSearchDto: PicSearchDto): Promise<Pic[]>{
    return await this.picFetchService.picSearchByCategory(picSearchDto)
  }

  @Post('/search')
  async searchInPicturesByInput(@Body() picSearchDto: PicSearchDto): Promise<Pic[]>{
    return await this.picFetchService.picSearchByInput(picSearchDto)
  }

}
  