import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortUrl, ShortUrlDocument } from './shorteners/schemas/shorturl.schema';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  constructor(
    @InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrlDocument>,
    private readonly configService: ConfigService
    ) {}
  getHello(): string {
    return 'Hello World!';
  }


  async getUrlCode(urlCode: string): Promise<any> {
    return this.shortUrlModel.findOne({urlCode}).exec();
  } 
}
