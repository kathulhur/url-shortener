export class CreateShortUrlDto {
    constructor(public urlCode, public longUrl, public shortUrl, public date){}
}