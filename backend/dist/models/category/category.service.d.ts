import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    findAll(): Promise<Category[]>;
}
