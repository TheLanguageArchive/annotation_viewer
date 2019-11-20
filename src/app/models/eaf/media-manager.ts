import { EafMedia } from './media';

export class EafMediaManager {

    _media: EafMedia[];
    _count: number;
    _first: EafMedia;

    constructor(media: EafMedia[], count: number, first: EafMedia) {

        this._media = media;
        this._count = count;
        this._first = first;
    }

    media() {
        return this._media;
    }

    count() {
        return this._count;
    }

    first() {
        return this._first;
    }

    fetch(id: number) {

        let media = this.media().find(media => media.id === id);
        return media ? media : null;
    }
}
