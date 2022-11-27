import { CategoryDto } from 'src/dto/category/category.dto';
import { Category } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<Category[]>;
    getCategoriesByTitle(title: string): Promise<Category>;
    getCategoryIdFromTitle(categoryDto: CategoryDto): Promise<Category>;
    uploadImage(category_picture: any, res: any, req: any, body: any): Promise<Category>;
}
