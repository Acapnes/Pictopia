import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/helpers/AuthGuards/jwt.strategy';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from './auth/auth.service';
import { UserAuthController } from './auth/user.auth.controller';
import { ModerationService } from './moderation/moderation.service';
import { SavedPicturesService } from './moderation/saved.pictures.service';
import { UserCategoryService } from './moderation/user.category.service';
import { UserModerationController } from './moderation/user.moderation.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-jwt-secret-key',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController,UserAuthController,UserModerationController],
  providers: [UserService, JwtStrategy, AuthService, ModerationService,SavedPicturesService,UserCategoryService],
})
export class UserModule {}
