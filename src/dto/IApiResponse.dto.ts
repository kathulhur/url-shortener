import { ICreateShortUrl } from "./ICreateShortUrl.dto";

export interface IApiResponse {
    apiVersion: String;
    data: ICreateShortUrl;

}