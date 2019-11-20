import { EafMediaManager } from "@fav-models/eaf/media-manager";
import { EafProperty } from "@fav-models/eaf/property";

export class EafHeader {

    mediafile: string;
    timeunits: string;
    media: EafMediaManager;
    properties: EafProperty[];

    constructor(mediafile: string, timeunits: string, media: EafMediaManager, properties: EafProperty[]) {

        this.mediafile  = mediafile;
        this.timeunits  = timeunits;
        this.media      = media;
        this.properties = properties;
    }
}
