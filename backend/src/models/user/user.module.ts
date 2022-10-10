import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/helpers/AuthGuards/jwt.strategy';
import { User, UserSchema } from 'src/schemas/user.schema';
import { RegistrationService } from './registration.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-jwt-secret-key',
      // signOptions: { expiresIn: '120s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy,RegistrationService],
})
export class UserModule {}
