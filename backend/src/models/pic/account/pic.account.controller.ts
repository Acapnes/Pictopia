import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicManageDto } from 'src/dto/pic/pic.manage.dto';
import { PaginationDto } from 'src/dto/pic/pagination.dto';
import { ReturnFuncDto } from 'src/dto/returns/return.func.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicService } from '../pic.service';
import { PicAccountFetchService } from './pic.account.fetch.service';
import { PicAccountService } from './pic.account.service';

@UseGuards(AuthGuard('jwt'))
@Controller('/pics/account')
export class PicAccountController {
  constructor(
    private readonly picsService: PicService,
    private readonly picAccountService: PicAccountService,
    private readonly picAccountFetchService: PicAccountFetchService,
    ) {}

  @Get()
  async getPics(): Promise<Pic[]> {
    return this.picsService.findAll();
  }

  @Post()
  async getPicsByPagination(@Req() req, @Body() picPaginationDto: PaginationDto): Promise<Pic[]> {
    return this.picAccountFetchService.picSearchByCategory(req.user._id,picPaginationDto);
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

  @Post('/explore')
  async searchInPicturesByExplore(@Req() req, @Body() picPaginationDto: PaginationDto): Promise<Pic[]>{
    return await this.picAccountFetchService.getPicturesByExplore(req.user._id, picPaginationDto)
  }

  @Post('/category')
  async searchInPicturesByCategory(@Req() req, @Body() picPaginationDto: PaginationDto): Promise<Pic[]>{
    return await this.picAccountFetchService.picSearchByCategory(req.user._id, picPaginationDto)
  }

  @Post('/search')
  async searchInPicturesByInput(@Body() picPaginationDto: PaginationDto): Promise<Pic[]>{
    return await this.picAccountFetchService.picSearchByInput(picPaginationDto)
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
  