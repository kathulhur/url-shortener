import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ShortenersModule } from './shorteners/shorteners.module';

@Module({
  imports: [BooksModule, ShortenersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
