import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicCreateDto } from 'src/dto/pic/pic.create.dto';
import { Pic } from 'src/schemas/pic.schema';
import { PicService } from './pic.service';

@Controller('/pics')
export class PicController {
  constructor(private readonly picsService: PicService) {}


  @Get()
  async getPics(): Promise<Pic[]> {
    return this.picsService.findAll();
  }

  @Get()
  async getPicsActionless(): Promise<Pic[]> {
    return this.picsService.findAll();
  }

  @Get('/pretty/:id')
  async getPrettyPicById(@Res() res, @Req() req, @Param('id') id): Promise<Pic> {
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
  async uploadImage(@UploadedFile() file, @Res() res, @Req() req, @Body() body): Promise<Pic>{
    const picture  = await this.picsService.createPostWithImage(req.user,file,body)

    const prettyResponse = picture.toObject();
    const host = req.get('host');
    prettyResponse.picture_file = undefined;
    prettyResponse.url = `http://${host}/pics/${prettyResponse._id}`;
    
    return res.send(prettyResponse)
  }

}

// @UseGuards(AuthGuard('jwt'))
