import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenersController } from './shorteners.controller';
import { ShortenersService } from './shorteners.service';
import { ShortUrl, ShortUrlSchema } from './schemas/shorturl.schema';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [MongooseModule.forFeature([{ name: ShortUrl.name, schema: ShortUrlSchema }]), ConfigModule],
  controllers: [ShortenersController],
  providers: [ShortenersService]
})

export class ShortenersModule {}
