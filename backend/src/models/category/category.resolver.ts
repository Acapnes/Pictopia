import { Args, Query, Resolver } from '@nestjs/graphql';
import { Category } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  async getCategoryByTitle(@Args('title') title: string): Promise<Category> {
    return await this.categoryService.findCategoryByTitle(title);
  }
}
