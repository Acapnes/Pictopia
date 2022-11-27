import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { CategoryService } from '../category/category.service';
import { PicController } from './pic.controller';
import { PicFetchService } from './pic.fetch.service';
import { PicResolver } from './pic.resolver';
import { PicService } from './pic.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pic.name, schema: PicSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [PicController],
  providers: [PicService, PicFetchService, PicResolver, CategoryService],
})
export class PicModule {}
