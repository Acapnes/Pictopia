import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/helpers/guards/jwt.strategy';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CategoryService } from '../category/category.service';
import { UserPictureService } from './account/user.picture.service';
import { UserAccountController } from './account/user.account.controller';
import { UserCategoryService } from './account/user.category.service';
import { AuthService } from './auth/auth.service';
import { UserAuthController } from './auth/user.auth.controller';
import { ModerationService } from './moderation/moderation.service';
import { UserModerationController } from './moderation/user.moderation.controller';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { UserCommentervice } from './account/user.comment.service';

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
  controllers: [
    UserController,
    UserAuthController,
    UserModerationController,
    UserAccountController,
  ],
  providers: [
    JwtStrategy,
    UserService,
    AuthService,
    ModerationService,
    UserPictureService,
    UserCategoryService,
    UserCommentervice,
    UserResolver,
    CategoryService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
