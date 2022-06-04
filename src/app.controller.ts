import { Controller, Query, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AppService } from './app.service';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('shorten')
    async shortenURL(@Query('url') originalUrl) {
        
        const baseUrl = this.configService.get<String>('base_url');

        if (!isURL(originalUrl)) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        }

        if (isURL(originalUrl)) {
            try {
                const url = await this.appService.findLongUrl(originalUrl);
                if (url) {
                    return url
                } else {
                    const code = nanoid(8);
                    const shortUrl = baseUrl + '/' + code;
                    
                    const shortUrlDto = new CreateShortUrlDto(code, originalUrl, shortUrl, Date.now());

                    return await this.appService.create(shortUrlDto);
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
