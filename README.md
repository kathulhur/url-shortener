<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

### Built With

* [Nest.js](https://nestjs.com/)


<p align="right">(<a href="#top">back to top</a>)</p>

## Description
A url shortener API

https://ikzi.ml make use of this API. Developed by my web developer friend, [goriio](https://github.com/goriio).


## API Base
https://short-url-webapp.herokuapp.com/


## Shortening a link
```
/shorten
```

### Example
```
GET/POST: https://short-url-webapp.herokuapp.com/shorten?url=www.google.com
```

Response
```json
{
  "apiVersion":"0.0.1",
  "data":{
    "urlCode":"dQJken_i",
    "longUrl":"https://www.google.com",
    "shortUrl":"https://short-url-webapp.herokuapp.com/dQJken_i",
    "date":"2022-06-21T14:54:28.525Z"
  }
}
```

## Getting information on a link
```
/info
```
This gets the information about the link. This requires a 'code' query parameter having the short url code.
Example: https://short-url-webapp.herokuapp.com/thisisacode &rarr; Code: `thisisacode`


### Example
```
GET/POST: https://short-url-webapp.herokuapp.com/info?code=www.google.com
```

Response
```json
{
  "apiVersion":"0.0.1",
  "data":{
    "urlCode":"dQJken_i",
    "longUrl":"https://www.google.com",
    "shortUrl":"https://short-url-webapp.herokuapp.com/dQJken_i",
    "date":"2022-06-21T14:54:28.525Z"
  }
}
```

<!-- ROADMAP -->
## Roadmap

- [ ] Custom error response
- [ ] Home Page
- [ ] Custom Domain

See the [open issues](https://github.com/kathulhur/url-shortener/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

# Setting up locally


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Joseph](https://github.com/kathulhur)
- Website - [https://kathulhur.github.io/portfolio/](https://kathulhur.github.io/portfolio/)
- Twitter - [@kathulhu_dev](https://twitter.com/kathulhu_dev)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Joseph - josephkarl19@gmail.com

Project Link: [https://github.com/kathulhur/url-shortener](https://github.com/kathulhur/url-shortener)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/kathulhur/url-shortener.svg?style=for-the-badge
[contributors-url]: https://github.com/kathulhur/url-shortener/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kathulhur/url-shortener.svg?style=for-the-badge
[forks-url]: https://github.com/kathulhur/url-shortener/network/members
[stars-shield]: https://img.shields.io/github/stars/kathulhur/url-shortener.svg?style=for-the-badge
[stars-url]: https://github.com/kathulhur/url-shortener/stargazers
[issues-shield]: https://img.shields.io/github/issues/kathulhur/url-shortener.svg?style=for-the-badge
[issues-url]: https://github.com/kathulhur/url-shortener/issues
[license-shield]: https://img.shields.io/github/license/kathulhur/url-shortener.svg?style=for-the-badge
[license-url]: https://github.com/kathulhur/url-shortener/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png

