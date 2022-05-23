import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShortenersService } from './shorteners.service';
import { isURL } from 'class-validator';

@Controller('shorteners')
export class ShortenersController {
    constructor (private shortenersService: ShortenersService) {}

    @Get('shorten')
    async shortenURL(@Query('url') originalURL) {
        const result = {
            success: false
        }

        if (isURL(originalURL)) {
            const shortenedURL = await this.shortenersService.shortenURL();
            result.success = true;
            result['result'] = {
                originalURL:  originalURL,
                shortenedURL: shortenedURL
            }
        }

        return result
    }
}
