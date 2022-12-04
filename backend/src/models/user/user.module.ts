import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/helpers/guards/jwt.strategy';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Pic, PicSchema } from 'src/schemas/pic.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CategoryService } from '../category/category.service';
import { AccountService } from './account/account.service';
import { UserAccountController } from './account/user.account.controller';
import { AuthService } from './auth/auth.service';
import { UserAuthController } from './auth/user.auth.controller';
import { UserModerationMiddleware } from './moderation/middleware/moderation.middleware';
import { ModerationService } from './moderation/moderation.service';
import { SavedPicturesService } from './moderation/saved.pictures.service';
import { UserCategoryService } from './moderation/user.category.service';
import { UserModerationController } from './moderation/user.moderation.controller';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-jwt-secret-key',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Pic.name, schema: PicSchema }]),
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
    AccountService,
    ModerationService,
    SavedPicturesService,
    UserCategoryService,
    UserResolver,
    CategoryService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(UserModerationMiddleware)
    //   .forRoutes({ path: '/user/profile/*', method: RequestMethod.ALL });
  }
}
