import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
