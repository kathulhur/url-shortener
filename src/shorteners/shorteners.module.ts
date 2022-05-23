import { Module } from '@nestjs/common';
import { ShortenersController } from './shorteners.controller';
import { ShortenersService } from './shorteners.service';

@Module({
  controllers: [ShortenersController],
  providers: [ShortenersService]
})
export class ShortenersModule {}
