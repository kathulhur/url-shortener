import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortenersService {
    shortenURL() : Promise<any> {
        return new Promise(resolve => {
            resolve('https://google.com');
        });
    }
}
