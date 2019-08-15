import { EafMedia } from "@fav-models/eaf/media";
import { EafProperty } from "@fav-models/eaf/property";

export class EafHeader {

    mediafile: string;
    timeunits: string;
    media: EafMedia[];
    properties: EafProperty[];

    constructor(mediafile: string, timeunits: string, media: EafMedia[], properties: EafProperty[]) {

        this.mediafile  = mediafile;
        this.timeunits  = timeunits;
        this.media      = media;
        this.properties = properties;
    }
}
