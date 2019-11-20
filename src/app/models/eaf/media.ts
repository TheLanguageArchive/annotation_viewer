export class EafMedia {

    id: number;
    url: string;
    mimetype: string;
    relative: string;
    audio: boolean;

    constructor(id: number, url: string, mimetype: string, relative: string, audio: boolean) {

        this.id       = id;
        this.url      = url;
        this.mimetype = mimetype;
        this.relative = relative;
        this.audio    = audio;
    }
}
