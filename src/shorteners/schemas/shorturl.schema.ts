import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ShortUrlDocument = ShortUrl & Document;

@Schema()
export class ShortUrl {
    @Prop()
    urlCode: string;

    @Prop()
    longUrl: String;
    
    @Prop()
    shortUrl: String;

    @Prop({ default: Date.now })
    date: Date
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);