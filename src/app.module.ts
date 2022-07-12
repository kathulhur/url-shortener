import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { ShortUrlSchema, ShortUrl } from './schemas/shorturl.schema';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client'),
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('database.databaseUri'),
        }),
        inject: [ConfigService]
      }), 
      MongooseModule.forFeature([{ name: ShortUrl.name, schema: ShortUrlSchema }]),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
