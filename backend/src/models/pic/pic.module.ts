import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { PicController } from './pic.controller';
import { PicService } from './pic.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pic.name, schema: PicSchema }])],
  controllers: [PicController],
  providers: [PicService],
})
export class PicModule {}
