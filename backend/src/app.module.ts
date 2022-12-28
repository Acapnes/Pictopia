import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './models/category/category.module';
import { CommentModule } from './models/comment/comment.module';
import { PicModule } from './models/pic/pic.module';
import { UserModule } from './models/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path:'/pictopia',
      autoSchemaFile: 'src/schema.gql',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/pictopia'),
    PicModule,
    UserModule,
    CommentModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
