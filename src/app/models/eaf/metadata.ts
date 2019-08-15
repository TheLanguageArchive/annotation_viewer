export class EafMetadata {

    author: string;
    date: number;
    format: string;
    version: string;

    constructor(author: string, date: number, format: string, version: string) {

        this.author  = author;
        this.date    = date;
        this.format  = format;
        this.version = version;
    }
}
