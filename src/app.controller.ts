import { Controller, Query, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ICreateShortUrl } from './dto/ICreateShortUrl.dto';
import { ShortUrl } from './schemas/shorturl.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('shorten')
    async shortenURL(@Query('url') originalUrl) {
        
        const baseUrl = this.configService.get<String>('baseUrl');

        if (isURL(originalUrl)) {
            try {
                const storedData: ShortUrl = await this.appService.findLongUrl(originalUrl);
                if (storedData) {
                  return this.appService.createApiResponseSuccess(storedData);
                } else {
                    const code = nanoid(8);
                    const shortUrl = baseUrl + '/' + code;
                    const shortUrlDto : ICreateShortUrl = { urlCode: code, longUrl: originalUrl, shortUrl:  shortUrl, date: new Date()};
                    return this.appService.createApiResponseSuccess(await this.appService.create(shortUrlDto));
                }
            } catch (e) {
                console.log(e)
                throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        } else {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        } 
    }

  @Get(":urlCode")
  async redirect(@Res() res, @Param('urlCode') urlCode: string) {
    // BUG: redirect doesn't work if there is no protocol part of the url
    try {
      const shortUrl = await this.appService.getUrlCode(urlCode);
      if (shortUrl) {
        res.redirect(shortUrl.longUrl);
      }
    } catch (error) {
      console.log(error)
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  
}
