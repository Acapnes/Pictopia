import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { PicController } from './pic.controller';
import { PicResolver } from './pic.resolver';
import { PicService } from './pic.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pic.name, schema: PicSchema }])],
  controllers: [PicController],
  providers: [PicService, PicResolver],
})
export class PicModule {}
