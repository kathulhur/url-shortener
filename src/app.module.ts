import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ShortenersModule } from './shorteners/shorteners.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
      MongooseModule.forRoot(configuration().database.mongodb_uri), 
      BooksModule, 
      ShortenersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
