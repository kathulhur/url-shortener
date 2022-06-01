import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlDocument } from './schemas/shorturl.schema'
import { nanoid } from 'nanoid';

@Injectable()
export class ShortenersService {
    constructor(@InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrlDocument>) {}

    shortenURL() : Promise<any> {
        return new Promise(resolve => {
            resolve('https://google.com');
        }); 
    }


    async findLongUrl(longUrl: String): Promise<any> {
        return this.shortUrlModel.findOne({ longUrl }).exec();
    }


}
