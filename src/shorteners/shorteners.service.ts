import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';
import { ShortUrl, ShortUrlDocument } from './schemas/shorturl.schema'
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShortenersService {
    constructor(
        @InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrlDocument>,
        private readonly configService: ConfigService
        ) {}

    shortenURL() : Promise<any> {
        return new Promise(resolve => {
            resolve('https://google.com');
        }); 
    }

    async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
        const urlCode = nanoid(8);
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
