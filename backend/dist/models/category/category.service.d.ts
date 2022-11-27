import { Model } from 'mongoose';
import { CategoryCreationDto } from 'src/dto/category/category.creation.dto';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    findAll(): Promise<Category[]>;
    findCategoryByTitle(title: string): Promise<Category>;
    getCategoryIdByTitle(title: string): Promise<Category>;
    createCategory(file: any, categoryCreationDto: CategoryCreationDto): Promise<Category & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
