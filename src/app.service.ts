import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortUrl, ShortUrlDocument } from './schemas/shorturl.schema';
import { ConfigService } from '@nestjs/config';
import { ICreateShortUrl } from './dto/ICreateShortUrl.dto';
import { IApiResponse } from './dto/IApiResponse.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrlDocument>,
    private readonly configService: ConfigService
    ) {}
  getHello(): string {
    return '<h1>Hello World!<h1>';
  }


  async getByUrlCode(urlCode: string): Promise<any> {
    return this.shortUrlModel.findOne({urlCode}).exec();
  } 

  createApiResponseSuccess(storedData: ShortUrl) {
    const apiResponse: IApiResponse = {
      apiVersion: process.env.API_VERSION, 
      data : {
        urlCode: storedData.urlCode,
        longUrl: storedData.longUrl,
        shortUrl: storedData.shortUrl,
        date: storedData.date,
      }
    }
    return apiResponse;
  }


  async create(createShortUrlDto: ICreateShortUrl): Promise<ShortUrl> {
    const createdShortUrl = new this.shortUrlModel(createShortUrlDto);
    return createdShortUrl.save();
  }

  async findAll(): Promise<ShortUrl[]> {
    return this.shortUrlModel.find().exec();
  }


  async findLongUrl(longUrl: String): Promise<ShortUrl> {
    return this.shortUrlModel.findOne({ longUrl }).exec();
  }
}
