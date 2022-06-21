import { Controller, Query, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ICreateShortUrl } from './dto/ICreateShortUrl.dto';
import { ShortUrl } from './schemas/shorturl.schema';
import { get } from 'http';

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

        if (isURL(originalUrl)) {// check whether originalUrl is a valid url
          if(!isURL(originalUrl, { require_protocol: true })) {// add protocol portion of the url if originalUrl doesn't contains such
            originalUrl = "https://" + originalUrl;
          }
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

  @Get("info")
  async getInfo(@Query('code') urlCode: string) {
    /* Return the information containing the urlCode from the database */
    try {
      const storedShortUrl = await this.appService.getByUrlCode(urlCode);
      if (storedShortUrl) {// data found
        return this.appService.createApiResponseSuccess(storedShortUrl);
      } else {// no data found with the urlCode
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      }
    } catch (error) {// error has occured
      console.log(error)
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  

  @Get(":urlCode")
  async redirect(@Res() res, @Param('urlCode') urlCode: string) {
    // BUG: redirect doesn't work if there is no protocol part of the url
    try {
      const shortUrl = await this.appService.getByUrlCode(urlCode);
      if (shortUrl) {
        res.redirect(shortUrl.longUrl);
      }
    } catch (error) {
      console.log(error)
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  
}
