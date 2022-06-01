import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ShortenersModule } from './shorteners/shorteners.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('database.database_uri'),
        }),
        inject: [ConfigService]
      }), 
      BooksModule, 
      ShortenersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
