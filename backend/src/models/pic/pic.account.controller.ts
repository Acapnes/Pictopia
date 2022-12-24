import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicManageDto } from 'src/dto/pic/pic.manage.dto';
import { PicSearchDto } from 'src/dto/pic/pic.search.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { SearchInterceptor } from 'src/helpers/interceptors/search.interceptor';
import { Pic } from 'src/schemas/pic.schema';
import { PicAccountService } from './pic.account.service';
import { PicFetchService } from './pic.fetch.service';
import { PicService } from './pic.service';

@UseGuards(AuthGuard('jwt'))
@Controller('/pics/account')
export class PicAccountController {
  constructor(
    private readonly picsService: PicService,
    private readonly picFetchService: PicFetchService,
    private readonly picAccountService: PicAccountService,
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

  @Post('/delete')
  async deleteAuthorsPicture(@Req() req,@Body() picManageDto: PicManageDto): Promise<ReturnFuncDto>{
    return await this.picAccountService.deleteAuthorsPicture(req.user._id,picManageDto)
  }

  @Post('/update')
  async updateAuthorsPicture(@Req() req,@Body() picManageDto: PicManageDto): Promise<ReturnFuncDto>{
    return await this.picAccountService.updateAuthorsPicture(req.user._id,picManageDto)
  }

}
  