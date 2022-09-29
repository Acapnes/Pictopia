import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PicModule } from './models/pic/pic.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/pictopia'),PicModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
