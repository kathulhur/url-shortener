import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ShortenersService } from './shorteners.service';
import { IsUrl, isURL } from 'class-validator';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';
import compareUrls from 'compare-urls';

@Controller('shorteners')
export class ShortenersController {
    constructor (
        private shortenersService: ShortenersService, 
        private configService: ConfigService
        ) {}

    @Get('')
    async getShorteners() {
        return "<h1>Hello world<h1>"
    }


    @Get('shorten')
    async shortenURL(@Query('url') originalUrl) {
        
        const baseUrl = this.configService.get<String>('base_url');

        if (!isURL(originalUrl)) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        }

        if (isURL(originalUrl)) {
            try {
                const url = await this.shortenersService.findLongUrl(originalUrl);
                if (url) {
                    return url
                } else {
                    const code = nanoid(8);
                    const shortUrl = baseUrl + '/' + code;
                    
                    const shortUrlDto = new CreateShortUrlDto(code, originalUrl, shortUrl, Date.now());

                    return await this.shortenersService.create(shortUrlDto);
                    // TODO: save the data here 
                }


            } catch (e) {
                console.log(e)
                throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        } else {
            throw new HttpException('Invalid Input', HttpStatus.BAD_REQUEST)
        }

            
    }
}
