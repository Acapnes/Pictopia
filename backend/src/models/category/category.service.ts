import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryCreationDto } from 'src/dto/category/category.creation.dto';

import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({});
  }

  async findCategoryByTitle(title: string): Promise<Category> {
    return this.categoryModel.findOne({ title: title });
  }

  async getCategoryIdByTitle(title: string): Promise<Category> {
    return (await this.categoryModel.findOne({ title: title }))._id;
  }

  async createCategory(file: any, categoryCreationDto: CategoryCreationDto) {
    const newCategory = await new this.categoryModel(categoryCreationDto);
    newCategory.category_picture_file.data = file.buffer;
    newCategory.category_picture_file.contentType = file.mimetype;

    return newCategory.save();
  }
}
