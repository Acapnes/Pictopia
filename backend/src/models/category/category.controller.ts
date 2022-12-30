import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryDto } from 'src/dto/category/category.dto';
import { Category } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getCategories(): Promise<Category[]> {
      return this.categoryService.findAll();
    }

    @Get('/:title')
    async getCategoriesByTitle(@Param('title') title: string): Promise<Category> {
      return this.categoryService.findCategoryByTitle(title);
    }

    @Post()
    async getCategoryIdFromTitle(@Body() categoryDto: CategoryDto): Promise<Category>{
      return this.categoryService.getCategoryIdByTitle(categoryDto.title);
    }

    @Post('/search')
    async searchCategoryByLike(@Body() categorySearch: CategoryDto): Promise<Category[]>{
      return this.categoryService.searchCategoryByLike(categorySearch.title);
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('category_picture'))
    async uploadImage(@UploadedFile() category_picture, @Res() res, @Req() req, @Body() body): Promise<Category>{
      const picture  = await this.categoryService.createCategory(category_picture,body)
  
      const prettyResponse = picture.toObject();
      const host = req.get('host');
      prettyResponse.picture_file = undefined;
      prettyResponse.url = `http://${host}/pics/${prettyResponse._id}`;
      
      return res.send(prettyResponse)
    }
}
