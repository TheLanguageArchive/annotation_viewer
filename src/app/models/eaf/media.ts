export class EafMedia {

    id: number;
    filename: string;
    url: string;
    mimetype: string;
    relative: string;
    audio: boolean;
    offset: number;

    constructor(id: number, filename: string, url: string, mimetype: string, relative: string, audio: boolean, offset: number) {

        this.id       = id;
        this.filename = filename;
        this.url      = url;
        this.mimetype = mimetype;
        this.relative = relative;
        this.audio    = audio;
        this.offset   = offset;
    }
}
