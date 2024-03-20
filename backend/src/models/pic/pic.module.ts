import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CommentSchema, Comment } from 'src/schemas/comment.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { PicAccountController } from './account/pic.account.controller';
import { PicAccountFetchService } from './account/pic.account.fetch.service';
import { PicAccountService } from './account/pic.account.service';
import { PicController } from './pic.controller';
import { PicFetchService } from './pic.fetch.service';
import { PicService } from './pic.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-jwt-secret-key',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Pic.name, schema: PicSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [PicController, PicAccountController],
  providers: [
    PicService,
    PicFetchService,
    PicAccountService,
    PicAccountFetchService,
    CategoryService,
    UserService,
    JwtService,
  ],
})
export class PicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
